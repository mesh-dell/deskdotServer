const pool = require("../config/db");

const SellerModel = {
  async createSeller(
    first_name,
    last_name,
    password,
    email,
    store_name,
    store_description
  ) {
    const query = `INSERT INTO sellers (first_name, last_name, password, email, store_name, store_description )
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;

    const values = [
      first_name,
      last_name,
      password,
      email,
      store_name,
      store_description,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async getAll() {
    const query = "SELECT * FROM sellers;";
    const result = await pool.query(query);
    return result.rows;
  },

  async findByEmail(email) {
    const query = "SELECT * FROM sellers WHERE email = $1;";
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async saveRefreshToken(seller_id, refresh_token) {
    const query =
      "UPDATE sellers SET refresh_token = $1 WHERE seller_id = $2 RETURNING *;";
    const values = [refresh_token, seller_id];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async findByRefreshToken(refresh_token) {
    const query = "SELECT * FROM sellers WHERE refresh_token = $1;";
    const values = [refresh_token];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async removeRefreshToken(refresh_token) {
    const query =
      "UPDATE sellers SET refresh_token = NULL WHERE refresh_token = $1 RETURNING *;";
    const values = [refresh_token];
    const result = await pool.query(query, values);
    return result.rows;
  },
};

module.exports = SellerModel;
