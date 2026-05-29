// AIZen 課程報名後端 — Express
// 端點：
//   GET  /api/price          → 目前價格（前端載入時呼叫）
//   POST /api/enroll         → 建立報名（寫 DB）+ 回傳綠界付款參數
//   POST /api/ecpay/return   → 綠界 server-to-server 付款結果回呼（驗章 + 更新 DB）
//   GET  /healthz            → 健康檢查
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const ecpay = require('./ecpay');

const app = express();

// ── 設定 ──
const cfg = {
  merchantId: process.env.ECPAY_MERCHANT_ID,
  hashKey: process.env.ECPAY_HASH_KEY,
  hashIV: process.env.ECPAY_HASH_IV,
  apiUrl: process.env.ECPAY_API_URL,
  baseUrl: (process.env.BASE_URL || '').replace(/\/$/, ''),
  thankyouUrl: process.env.THANKYOU_URL || '',
};
const allowedOrigins = (process.env.ALLOWED_ORIGIN || '')
  .split(',').map((s) => s.trim()).filter(Boolean);

// ── Middleware ──
app.use(cors({
  origin(origin, cb) {
    // 允許名單內來源；同源/無 origin（如綠界伺服器回呼）也放行
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 綠界回呼是 x-www-form-urlencoded

app.get('/healthz', (_req, res) => res.json({ ok: true }));

// ── 目前價格 ──
app.get('/api/price', async (_req, res) => {
  try {
    const p = await db.getPricing();
    res.json({
      earlybird: p.earlybird,
      original: p.original,
      savePct: p.save_pct,
      installments: {
        3: Math.ceil(p.earlybird / 3),
        6: Math.ceil(p.earlybird / 6),
      },
    });
  } catch (e) {
    console.error('price error', e);
    res.status(500).json({ error: 'price_unavailable' });
  }
});

// ── 報名 + 建立綠界訂單 ──
app.post('/api/enroll', async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim();
    const phone = String(req.body.phone || '').trim();
    const plan = String(req.body.plan || '1').trim();

    if (!name || !email || !phone) {
      return res.status(400).json({ error: '請完整填寫姓名、Email 與電話' });
    }
    if (!['1', '3', '6'].includes(plan)) {
      return res.status(400).json({ error: '付款方式無效' });
    }

    // 金額一律以後端價格為準（不信任前端傳來的金額）
    const pricing = await db.getPricing();
    const amount = pricing.earlybird;

    // 唯一訂單編號（≤20 碼、英數）：AZ + 時間 + 亂數
    const merchantTradeNo =
      'AZ' + Date.now().toString(36).toUpperCase() +
      Math.random().toString(36).slice(2, 6).toUpperCase();

    await db.createEnrollment({ merchantTradeNo, name, email, phone, plan, amount });

    const order = ecpay.buildOrder({ merchantTradeNo, amount, plan }, cfg);
    // 前端會用這個 {action, params} 建表單自動送往綠界付款頁
    res.json(order);
  } catch (e) {
    console.error('enroll error', e);
    res.status(500).json({ error: '建立訂單失敗，請稍後再試' });
  }
});

// ── 綠界付款結果回呼（server-to-server）──
app.post('/api/ecpay/return', async (req, res) => {
  try {
    const body = req.body || {};
    if (!ecpay.verifyCallback(body, cfg.hashKey, cfg.hashIV)) {
      console.warn('ECPay CheckMacValue 驗證失敗', body.MerchantTradeNo);
      return res.send('0|CheckMacValue Error');
    }
    const mtn = body.MerchantTradeNo;
    if (body.RtnCode === '1') {
      await db.markPaid(mtn, body.TradeNo || null, body);
    } else {
      await db.markFailed(mtn, body);
    }
    // 一定要回 "1|OK"，否則綠界會持續重送
    res.send('1|OK');
  } catch (e) {
    console.error('ecpay return error', e);
    res.send('0|Exception');
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`AIZen backend listening on :${port}`));
