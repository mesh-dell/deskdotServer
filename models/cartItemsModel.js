const pool = require("../config/db");

const CartItemsModel = {
  async addItem(cart_id, product_id, quantity) {
    const query = `INSERT INTO cart_items (cart_id, product_id, quantity)
       VALUES ($1, $2, $3) RETURNING *;`;

    const values = [cart_id, product_id, quantity];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async removeItem(cart_item_id) {
    const query = "DELETE FROM cart_items WHERE cart_item_id = $1 RETURNING *;";

    const values = [cart_item_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async updateQuantity(cart_item_id, quantity) {
    const query =
      "UPDATE cart_items SET quantity = $1 WHERE cart_item_id = $2 RETURNING *";

    const values = [quantity, cart_item_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByCartId(cart_id) {
    const query = "SELECT * FROM cart_items WHERE cart_id =$1;";
    const values = [cart_id];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async getCartItem(cart_item_id) {
    const query = "SELECT * FROM cart_items WHERE cart_item_id = $1";
    const values = [cart_item_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async clearCart(cart_id) {
    const query = "DELETE from cart_items WHERE cart_id = $1 RETURNING *";
    const values = [cart_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = CartItemsModel;
