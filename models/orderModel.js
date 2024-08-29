const pool = require("../config/db");

const OrderModel = {
  async createOrder(buyer_id) {
    const query = `INSERT INTO orders (buyer_id)
       VALUES ($1) RETURNING *;`;

    const values = [buyer_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByBuyerId(buyer_id) {
    const query = "SELECT * FROM orders WHERE buyer_id = $1";
    const values = [buyer_id];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async cancelOrder(order_id) {
    const query = "DELETE FROM orders WHERE order_id = $1 RETURNING *;";
    const values = [order_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = OrderModel;
