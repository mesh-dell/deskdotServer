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

  async findById(product_id) {
    const query = "SELECT * FROM products WHERE product_id = $1";
    const values = [product_id];
    const result = pool.query(query, values);
  },
  
  async getAllProducts() {
    const query = "SELECT * FROM products;";
    const result = await pool.query(query);
    return result.rows;
  },

  async findBySellerId(seller_id) {
    const query = "SELECT * FROM products WHERE seller_id = $1";
    const values = [seller_id];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async updateProduct(
    product_id,
    product_name,
    product_description,
    price,
    quantity
  ) {
    const query = `UPDATE products
    SET product_name = $1, product_description = $2, price = $3, quantity = $4 WHERE product_id = $5;`;

    const values = [
      product_name,
      product_description,
      price,
      quantity,
      product_id,
    ];
    const result = await pool.query(query, values);
    return result.rows;
  },
};

module.exports = ProductModel;
