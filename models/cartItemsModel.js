const pool = require("../config/db");

const CartItemsModel = {
  async addItem(cart_id, product_id, quantity) {
    const query = `INSERT INTO cart_items (cart_id, product_id, quantity)
       VALUES ($1, $2, $3) RETURNING *;`;

    const values = [cart_id, product_id, quantity];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async removeItem(cart_id, product_id) {
    const query =
      "DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *;";

    const values = [cart_id, product_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async updateQuantity(cart_id, product_id, quantity) {
    const query =
      "UPDATE cart_items SET quantity = $1 WHERE cart_id = $2 AND product_id = $3 RETURNING *";

    const values = [quantity, cart_id, product_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getAllProducts(cart_id) {
    const query = "SELECT * FROM cart_items WHERE cart_id =$1;";
    const values = [cart_id];

    const result = await pool.query(query, values);
    return result.rows;
  },

  async getByProductId(product_id, cart_id) {
    const query =
      "SELECT * FROM cart_items WHERE product_id = $1 AND cart_id = $2;";
    const values = [product_id, cart_id];

    const result = await pool.query(query, values);
    return result.rows;
  },
};

module.exports = CartItemsModel;
