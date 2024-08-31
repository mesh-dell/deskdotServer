const CartItemModel = require("../models/cartItemsModel");

const CartItemController = {
  async add(req, res) {
    try {
      const { cart_id, product_id, quantity } = req.body;
      const cartItem = await CartItemModel.addItem(
        cart_id,
        product_id,
        quantity
      );
      res.status(201).json(cartItem);
    } catch (err) {
      //Handle unique constraint violation (duplicate entry)
      if (err.code == "23505") {
        res.status(409).json({ message: "Product is already in cart" });
      }
      res.status(400).json({ message: err.message });
    }
  },

  async remove(req, res) {
    try {
      const cartItem = await CartItemModel.removeItem(req.params.cart_item_id);
      if (cartItem) {
        res.json(cartItem);
      } else {
        res.status(404).json({ message: "Cart item not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async updateQuantity(req, res) {
    try {
      const cart_item_id = req.params.cart_item_id;
      const { quantity } = req.body;
      const cartItem = await CartItemModel.updateQuantity(
        cart_item_id,
        quantity
      );

      if (cartItem) {
        res.json(cartItem);
      } else {
        res.status(404).json({ message: "Cart item not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async findByCartId(req, res) {
    try {
      const cartItems = await CartItemModel.findByCartId(req.params.cart_id);

      if (cartItems) {
        res.json(cartItems);
      } else {
        res.status(404).json({ message: "Cart item not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = CartItemController;
