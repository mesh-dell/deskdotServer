const pool = require("../config/db");

const categoriesModel = {
  async createCategory(category_name, category_description) {
    const query = `INSERT INTO categories (category_name, category_description)
       VALUES ($1, $2) RETURNING *;`;

    const values = [category_name, category_description];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = categoriesModel;
