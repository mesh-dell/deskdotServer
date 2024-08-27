const pool = require("../config/db");

const ProductModel = {
  async createProduct(
    seller_id,
    product_name,
    product_description,
    price,
    quantity
  ) {
    const query = `INSERT INTO sellers (seller_id, product_name, product_description, price, quantity)
       VALUES ($1, $2, $3, $4 ) RETURNING *;`;

    const values = [
      seller_id,
      product_name,
      product_description,
      price,
      quantity,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = ProductModel;
