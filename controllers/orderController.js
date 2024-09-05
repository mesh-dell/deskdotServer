const OrderModel = require("../models/orderModel");
const OrderItemModel = require("../models/orderItemModel");
const CartModel = require("../models/cartModel");
const CartItemsModel = require("../models/cartItemsModel");
const ProductModel = require("../models/productModel");

const OrderController = {
  async createOrder(req, res, next) {
    try {
      const { id } = req.user;
      const order = await OrderModel.createOrder(id);
      const cart = await CartModel.findByBuyerId(id);

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const cartItems = await CartItemsModel.findByCartId(cart.cart_id);

      if (!cartItems.length) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      const items = await Promise.all(
        cartItems.map(async (item) => {
          const product = await ProductModel.findById(item.product_id);
          return OrderItemModel.createOrderItem(
            order.order_id,
            item.product_id,
            product.seller_id,
            item.quantity,
            product.price
          );
        })
      );

      res.status(201).json(items);
    } catch (error) {
      next(error);
    }
  },

  async getUserOrders(req, res, next) {
    try {
      const { id } = req.user;
      const orders = await OrderModel.findByBuyerId(id);

      if (!orders.length) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Get items
      const ordersWithItems = await Promise.all(
        orders.map(async (order) => {
          const orderItems = await OrderItemModel.findByOrderId(order.order_id);
          return {
            ...order,
            items: orderItems,
          };
        })
      );

      res.json({
        message: "Orders fetched successfully.",
        orders: ordersWithItems,
      });
    } catch (error) {
      next(error);
    }
  },

  async getOrder(req, res, next) {
    try {
      const orderId = req.params.order_id;
      const order = await OrderModel.findByOrderId(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      const orderItems = await OrderItemModel.findByOrderId(orderId);
      res.json({ order, orderItems });
    } catch (error) {
      next(error);
    }
  },

  // Seller
  async updateStatus(req, res, next) {
    try {
      const { order_item_id } = req.params;
      const { status } = req.body;

      const updatedItem = await OrderItemModel.updateStatus(
        order_item_id,
        status
      );

      res.json({ message: "Order status updated", updatedItem });
    } catch (error) {
      next(error);
    }
  },

  async cancelOrder(req, res, next) {
    try {
      const { id } = req.user;
      const orderId = req.params.order_id;
      const order = await OrderModel.findByOrderId(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      if (order.buyer_id != id) {
        return res
          .status(403)
          .json({ message: "Not authorized to cancel this order" });
      }

      const cancelledOrder = await OrderModel.cancelOrder(orderId);

      res.json({ message: "Order cancelled succesfully", cancelledOrder });
    } catch (error) {
      next(error);
    }
  },

  async getSellerOrders(req, res, next) {
    try {
      const { id } = req.user;
      const items = await OrderItemModel.findBySellerId(id);
      res.json(items);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = OrderController;
