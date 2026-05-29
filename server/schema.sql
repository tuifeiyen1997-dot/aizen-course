-- AIZen 報名/訂單資料表（PostgreSQL）
-- 若你用 MySQL，把 BIGSERIAL→BIGINT AUTO_INCREMENT、TIMESTAMPTZ→DATETIME、JSONB→JSON 即可。

CREATE TABLE IF NOT EXISTS enrollments (
  id                BIGSERIAL PRIMARY KEY,
  merchant_trade_no VARCHAR(20) UNIQUE NOT NULL,   -- 給綠界的唯一訂單編號
  name              TEXT        NOT NULL,
  email             TEXT        NOT NULL,
  phone             TEXT        NOT NULL,
  plan              VARCHAR(4)  NOT NULL,           -- '1' 一次付清 | '3' 分3期 | '6' 分6期
  amount            INTEGER     NOT NULL,           -- 總金額（NT$）
  status            VARCHAR(12) NOT NULL DEFAULT 'pending', -- pending | paid | failed
  ecpay_trade_no    TEXT,                           -- 綠界交易編號（付款後回填）
  raw_callback      JSONB,                          -- 綠界回呼原始內容（稽核用）
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  paid_at           TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_email  ON enrollments(email);

-- 早鳥價設定（單列表，改價直接 UPDATE 這列，前端 /api/price 會即時反映）
CREATE TABLE IF NOT EXISTS pricing (
  id        INT PRIMARY KEY DEFAULT 1,
  earlybird INTEGER NOT NULL,   -- 早鳥價
  original  INTEGER NOT NULL,   -- 原價
  save_pct  INTEGER NOT NULL,   -- 省下百分比
  CHECK (id = 1)
);

INSERT INTO pricing (id, earlybird, original, save_pct)
VALUES (1, 8800, 12800, 31)
ON CONFLICT (id) DO NOTHING;
