const pool = require("../config/db");

const CartModel = {
  async createCart(buyer_id) {
    const query = `INSERT INTO carts (buyer_id)
       VALUES ($1) RETURNING *;`;

    const values = [buyer_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByBuyerId(buyer_id) {
    const query = "SELECT * FROM carts WHERE buyer_id = $1";
    const values = [buyer_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = CartModel;
