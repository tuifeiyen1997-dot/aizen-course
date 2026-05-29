# AIZen 課程報名後端

自建 Node/Express 後端：接收 Webflow 報名表單 → 寫入 PostgreSQL → 建立綠界（ECPay）金流訂單 → 驗證付款回呼。

## 架構流程

```
Webflow 表單 ──POST /api/enroll──▶ 後端
                                   ① 寫入 enrollments（status=pending）
                                   ② 算 CheckMacValue 建立綠界訂單
                                   ③ 回傳 {action, params}
前端用回傳值建表單自動送出 ─────▶ 綠界付款頁（用戶付款）
綠界 ──POST /api/ecpay/return──▶ 後端
                                   ④ 驗 CheckMacValue → status=paid → 回 "1|OK"
綠界把用戶導回 ClientBackURL（你的感謝頁）
```

## 安裝與啟動

```bash
cd server
cp .env.example .env      # 填好資料庫、網域、綠界金鑰
npm install
npm run initdb            # 建立資料表（enrollments / pricing）
npm start                 # 預設 :8080
```

## 環境變數（.env）

| 變數 | 說明 |
|------|------|
| `PORT` | 監聽埠 |
| `BASE_URL` | 後端對外 https 網址（綠界回呼用，必須公開可連） |
| `ALLOWED_ORIGIN` | 允許的前端來源（CORS），多個用逗號分隔 |
| `THANKYOU_URL` | 付款完成導回的感謝頁 |
| `DATABASE_URL` | PostgreSQL 連線字串 |
| `ECPAY_MERCHANT_ID / HASH_KEY / HASH_IV / API_URL` | 綠界商店資料（預設為官方測試帳號） |

> ⚠️ `.env` 已被 `.gitignore` 忽略，**金鑰絕不要 commit**。

## 前端串接（Webflow）

在 Webflow 第 ③ 個 Embed（JS）**之前**，加一行設定後端網址：

```html
<script>window.AIZEN_API_BASE = 'https://api.你的網域.com';</script>
```

`script.js` 會自動：載入時抓 `/api/price` 更新價格；送出表單時 POST `/api/enroll` 並導向綠界。

## 綠界測試

- 預設使用綠界**測試環境**（`payment-stage.ecpay.com.tw`）與官方測試帳號 `2000132`。
- 測試信用卡：卡號 `4311-9522-2222-2222`、有效期任意未來、安全碼任意三碼。
- 上正式：把 `.env` 的 MerchantID/HashKey/HashIV 換成正式，`ECPAY_API_URL` 改為 `https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5`。

## 改早鳥價

直接改資料庫即可，前端會即時反映：

```sql
UPDATE pricing SET earlybird = 7800, original = 12800, save_pct = 39 WHERE id = 1;
```

## 部署注意

- `BASE_URL` 必須是綠界連得到的公開 https（本機測試可用 ngrok）。
- 別忘了在 `ALLOWED_ORIGIN` 加入你的 Webflow 網域，否則前端會被 CORS 擋。
