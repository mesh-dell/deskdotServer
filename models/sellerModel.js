const pool = require("../config/db");

const SellerModel = {
  async createSeller(
    fisrt_name,
    last_name,
    password,
    email,
    store_name,
    store_description
  ) {
    const query = `INSERT INTO sellers (fisrt_name, last_name, password, email, store_name, store_description )
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;

    const values = [
      fisrt_name,
      last_name,
      password,
      email,
      store_name,
      store_description,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = SellerModel;
