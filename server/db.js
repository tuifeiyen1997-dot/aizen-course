// 資料庫存取層（PostgreSQL via pg）
// 換 DB 時只要改這個檔案，server.js 不用動。
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
  pool,

  async getPricing() {
    const { rows } = await pool.query(
      'SELECT earlybird, original, save_pct FROM pricing WHERE id = 1'
    );
    return rows[0] || { earlybird: 8800, original: 12800, save_pct: 31 };
  },

  async createEnrollment(e) {
    const { rows } = await pool.query(
      `INSERT INTO enrollments (merchant_trade_no, name, email, phone, plan, amount)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [e.merchantTradeNo, e.name, e.email, e.phone, e.plan, e.amount]
    );
    return rows[0];
  },

  async getEnrollment(merchantTradeNo) {
    const { rows } = await pool.query(
      'SELECT * FROM enrollments WHERE merchant_trade_no = $1',
      [merchantTradeNo]
    );
    return rows[0] || null;
  },

  async markPaid(merchantTradeNo, ecpayTradeNo, raw) {
    await pool.query(
      `UPDATE enrollments
          SET status = 'paid', paid_at = now(), ecpay_trade_no = $2, raw_callback = $3
        WHERE merchant_trade_no = $1`,
      [merchantTradeNo, ecpayTradeNo, raw]
    );
  },

  async markFailed(merchantTradeNo, raw) {
    await pool.query(
      `UPDATE enrollments
          SET status = 'failed', raw_callback = $2
        WHERE merchant_trade_no = $1`,
      [merchantTradeNo, raw]
    );
  },
};
