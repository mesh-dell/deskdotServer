const pool = require("../config/db");

const BuyerModel = {
  async createBuyer(fisrt_name, last_name, password, email) {
    const query = `INSERT INTO buyers (fisrt_name, last_name, password, email )
       VALUES ($1, $2, $3, $4 ) RETURNING *;`;

    const values = [fisrt_name, last_name, password, email];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async findByEmail(email) {
    const query = "SELECT * FROM buyers WHERE email = $1;";
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows;
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
    return result.rows;
  },

  async removeRefreshToken(refresh_token) {
    const query =
      "UPDATE buyers SET refresh_token = NULL WHERE refresh_token = $1 RETURNING *;";
    const values = [refresh_token];
    const result = await pool.query(query, values);
    return result.rows;
  },
};

module.exports = BuyerModel;
