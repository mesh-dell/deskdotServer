const pool = require("../config/db");

const CartItemsModel = {
  async createCartItem(cart_id, product_id, quantity) {
    const query = `INSERT INTO cart_items (cart_id, product_id, quantity)
       VALUES ($1, $2, $3) RETURNING *;`;

    const values = [cart_id, product_id, quantity];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = CartItemsModel;
