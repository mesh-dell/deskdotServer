const SellerModel = require("../models/sellerModel");

const SellerController = {
  async createSeller(req, res) {
    try {
      const {
        fisrt_name,
        last_name,
        password,
        email,
        store_name,
        store_description,
      } = req.body;

      const seller = await SellerModel.createSeller(
        fisrt_name,
        last_name,
        password,
        email,
        store_name,
        store_description
      );

      res.status(201).json(seller);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async getAllSellers(req, res) {
    try {
      const sellers = await SellerModel.getAll();
      res.status(200).json(sellers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = SellerController;
