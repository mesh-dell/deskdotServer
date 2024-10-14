const pool = require("../config/db");

const BuyerModel = {
  async createBuyer(first_name, last_name, password, email) {
    const query = `INSERT INTO buyers (first_name, last_name, password, email )
       VALUES ($1, $2, $3, $4 ) RETURNING *;`;

    const values = [first_name, last_name, password, email];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = "SELECT * FROM buyers WHERE email = $1;";
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async saveRefreshToken(buyer_id, refresh_token) {
    const query =
      "UPDATE buyers SET refresh_token = $1 WHERE buyer_id = $2 RETURNING *;";
    const values = [refresh_token, buyer_id];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async findByRefreshToken(refresh_token) {
    const query = "SELECT * FROM buyers WHERE refresh_token = $1;";
    const values = [refresh_token];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async removeRefreshToken(refresh_token) {
    const query =
      "UPDATE buyers SET refresh_token = NULL WHERE refresh_token = $1 RETURNING *;";
    const values = [refresh_token];
    const result = await pool.query(query, values);
    return result.rows;
  },

  async findById(id) {
    const query = "SELECT * FROM buyers WHERE buyer_id = $1;";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async updateProfile(buyer_id, { first_name, last_name, email }) {
    const query = `UPDATE buyers
    SET first_name = $1, last_name = $2, email = $3 WHERE buyer_id = $4 
    RETURNING buyer_id, first_name, last_name, email`;

    const values = [first_name, last_name, email, buyer_id];
    const result = await pool.query(query, values);
    return result.rows;
  },
};

module.exports = BuyerModel;
