const BuyerModel = require("../models/buyerModel");

const BuyerController = {
  async createBuyer(req, res) {
    try {
      const { fisrt_name, last_name, password, email } = req.body;
      const buyer = await BuyerModel.createBuyer(
        fisrt_name,
        last_name,
        password,
        email
      );

      res.status(201).json(buyer);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async findByEmail(req, res) {
    try {
      const { email } = req.body;
      const buyer = await BuyerModel.findByEmail(email);
      if (buyer) {
        res.json(buyer);
      } else {
        res.status(404).json({ message: "Buyer not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = BuyerController;
