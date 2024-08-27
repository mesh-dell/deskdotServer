const pool = require("../config/db");

const OrderModel = {
  async createOrder(buyer_id) {
    const query = `INSERT INTO orders (buyer_id)
       VALUES ($1) RETURNING *;`;

    const values = [buyer_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = OrderModel;
