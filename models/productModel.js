const { query } = require("express");
const pool = require("../config/db");

const ProductModel = {
  async createProduct(
    seller_id,
    product_name,
    product_description,
    price,
    quantity
  ) {
    const query = `INSERT INTO products (seller_id, product_name, product_description, price, quantity)
       VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

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

  async getAllProducts() {
    const query = "SELECT * FROM products";
    const result = await pool.query(query);
    return result.rows;
  },

  
};

module.exports = ProductModel;
