const pool = require("../config/db");

const BuyerModel = {
  async createBuyer(fisrt_name, last_name, password, email) {
    const query = `INSERT INTO buyers (fisrt_name, last_name, password, email )
       VALUES ($1, $2, $3, $4 ) RETURNING *;`;

    const values = [fisrt_name, last_name, password, email];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = BuyerModel;