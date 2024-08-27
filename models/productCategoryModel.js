const pool = require("../config/db");

const ProductCategoriesModel = {
  async addProductToCategory(product_id, category_id) {
    const query = `INSERT INTO product_categories (product_id, category_id)
       VALUES ($1, $2) RETURNING *;`;

    const values = [product_id, category_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = ProductCategoriesModel;
