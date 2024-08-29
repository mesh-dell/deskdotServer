const CartModel = require("../models/cartModel");

const CartController = {
  async create(req, res) {
    try {
      const { buyer_id } = req.body;
      const cart = await CartModel.createCart(buyer_id);
      res.status(201).json(cart);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async findByBuyerId(req, res) {
    try {
      const cart = await CartModel.findByBuyerId(req.params.buyer_id);

      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({ message: "Cart not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = CartController;
