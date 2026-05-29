// 綠界 ECPay AioCheckOut V5 — CheckMacValue 產生/驗證 + 建立訂單參數
// 演算法依綠界官方文件：排序 → 串接 HashKey/HashIV → .NET 風格 URL encode → 轉小寫 → SHA256 → 轉大寫
const crypto = require('crypto');

// .NET HttpUtility.UrlEncode 風格：encodeURIComponent 後，把這些還原成字面字元
function dotNetUrlEncode(str) {
  return encodeURIComponent(str)
    .replace(/%20/g, '+')
    .replace(/%21/g, '!')
    .replace(/%28/g, '(')
    .replace(/%29/g, ')')
    .replace(/%2a/gi, '*')
    .replace(/%2d/gi, '-')
    .replace(/%2e/gi, '.')
    .replace(/%5f/gi, '_');
}

// 產生 CheckMacValue（EncryptType=1 → SHA256）
function genCheckMacValue(params, hashKey, hashIV) {
  const keys = Object.keys(params)
    .filter((k) => k !== 'CheckMacValue')
    .sort((a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1));

  let raw = `HashKey=${hashKey}`;
  for (const k of keys) raw += `&${k}=${params[k]}`;
  raw += `&HashIV=${hashIV}`;

  const encoded = dotNetUrlEncode(raw).toLowerCase();
  return crypto.createHash('sha256').update(encoded).digest('hex').toUpperCase();
}

// 驗證綠界回呼的 CheckMacValue 是否正確（防偽造）
function verifyCallback(body, hashKey, hashIV) {
  const received = body.CheckMacValue;
  const expected = genCheckMacValue(body, hashKey, hashIV);
  return !!received && received.toUpperCase() === expected;
}

// yyyy/MM/dd HH:mm:ss
function formatTradeDate(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}/${p(d.getMonth() + 1)}/${p(d.getDate())} ` +
         `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

// 建立要送往綠界付款頁的參數（含 CheckMacValue）
// plan: '1' 一次付清 | '3' 分3期 | '6' 分6期
function buildOrder({ merchantTradeNo, amount, plan }, cfg) {
  const params = {
    MerchantID: cfg.merchantId,
    MerchantTradeNo: merchantTradeNo,
    MerchantTradeDate: formatTradeDate(),
    PaymentType: 'aio',
    TotalAmount: String(amount),
    TradeDesc: 'AIZen 8-week energy management course',
    ItemName: 'AIZen 中高階主管能量管理訓練課程',
    ReturnURL: `${cfg.baseUrl}/api/ecpay/return`,   // server-to-server 付款結果
    ClientBackURL: cfg.thankyouUrl,                  // 用戶付款後導回頁
    ChoosePayment: plan === '1' ? 'ALL' : 'Credit',
    EncryptType: '1',
  };
  // 信用卡分期（3 或 6 期）
  if (plan === '3' || plan === '6') params.CreditInstallment = plan;

  params.CheckMacValue = genCheckMacValue(params, cfg.hashKey, cfg.hashIV);
  return { action: cfg.apiUrl, params };
}

module.exports = { genCheckMacValue, verifyCallback, buildOrder, formatTradeDate };
