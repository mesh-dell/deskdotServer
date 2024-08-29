const pool = require("../config/db");

const OrderItemModel = {
  async createOrderItem(order_id, product_id, seller_id, quantity, price) {
    const query = `INSERT INTO order_items (order_id, product_id, seller_id, quantity, price )
       VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

    const values = [order_id, product_id, seller_id, quantity, price];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByOrderId(order_id) {
    const query = "SELECT * FROM order_items WHERE order_id =  $1;";
    const values = [order_id];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async findBySellerId(seller_id) {
    const query = "SELECT * FROM order_items WHERE seller_id =  $1;";
    const values = [seller_id];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async updateStatus(order_item_id, status) {
    const query =
      "UPDATE order_items SET status = $1 WHERE order_item_id = $2 RETURNING *;";
    const values = [status, order_item_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = OrderItemModel;
