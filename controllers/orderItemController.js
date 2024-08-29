const OrderItemModel = require("../models/orderItemModel");

const OrderItemController = {
  async addItem(req, res) {
    try {
      const order_id = req.params.order_id;
      const { product_id, seller_id, quantity, price } = req.body;

      const orderItem = await OrderItemModel.createOrderItem(
        order_id,
        product_id,
        seller_id,
        quantity,
        price
      );

      res.status(201).json(orderItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async findByOrderId(req, res) {
    try {
      const items = await OrderItemModel.findByOrderId(req.params.order_id);
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async findBySellerId(req, res) {
    try {
      const items = await OrderItemModel.findBySellerId(req.params.seller_id);
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const updatedItem = await OrderItemModel.updateStatus(
        req.params.order_item_id,
        status
      );
      if (updatedItem) {
        res.json(updatedItem);
      } else {
        res.status(404).json({ message: "Item not found" });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
};

module.exports = OrderItemController;
