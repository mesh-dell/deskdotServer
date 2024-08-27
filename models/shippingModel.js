const pool = require("../config/db");

const ShippingModel = {
  async createShipping(
    order_id,
    city,
    county,
    phone_number,
    first_name,
    last_name,
    postal_code,
    apartment
  ) {
    const query = `INSERT INTO cart_items (order_id, city, county, phone_number, first_name, last_name, postal_code, apartment)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;

    const values = [
      order_id,
      city,
      county,
      phone_number,
      first_name,
      last_name,
      postal_code,
      apartment,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
};

module.exports = ShippingModel;
