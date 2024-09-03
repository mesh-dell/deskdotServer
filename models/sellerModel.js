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

  async findById(id) {
    const query = "SELECT * FROM sellers WHERE seller_id = $1;";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async updateProfile(
    seller_id,
    { first_name, last_name, email, store_name, store_description }
  ) {
    const query = `UPDATE sellers
    SET first_name = $1, last_name = $2, email = $3, store_name = $4, store_description = $5 WHERE seller_id = $6 
    RETURNING seller_id, first_name, last_name, email, store_name, store_description`;

    const values = [
      first_name,
      last_name,
      email,
      store_name,
      store_description,
      seller_id,
    ];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async getAllStores() {
    const query =
      "SELECT store_name, store_description, seller_id FROM sellers";

    const result = await pool.query(query);
    return result.rows;
  },
};

module.exports = SellerModel;
