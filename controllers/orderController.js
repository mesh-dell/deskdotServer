const OrderModel = require("../models/orderModel");

const OrderController = {
  async createOrder(req, res) {
    try {
      const order = await OrderModel.createOrder(req.params.buyer_id);
      res.status(201).json(order);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async cancelOrder(req, res) {
    try {
      const order = await OrderModel.cancelOrder(req.params.order_id);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async findByBuyerId(req, res) {
    try {
      const orders = await OrderModel.findByBuyerId(req.params.buyer_id);
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const order = await OrderModel.updateStatus(req.params.order_id, status);

      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = OrderController;
