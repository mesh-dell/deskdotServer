const pool = require("../config/db");

const ShippingPriceModel = {
  async getShippingPrice(city) {
    const query = "SELECT price FROM shipping_prices WHERE city = $1;";
    const values = [city];
    const result = await pool.query(query, values);
    return result.rows;
  },
};

module.exports = ShippingPriceModel;
