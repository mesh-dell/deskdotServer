const CartModel = require("../models/cartModel");
const CartItemsModel = require("../models/cartItemsModel");

const CartController = {
  async getCart(req, res, next) {
    try {
      const { id } = req.user;
      const cart = await CartModel.findByBuyerId(id);

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const { cart_id } = cart;
      const cartItems = await CartItemsModel.findByCartId(cart_id);

      res.json(cartItems);
    } catch (error) {
      next(error);
    }
  },

  async addToCart(req, res, next) {
    try {
      const { id } = req.user;
      let cart = await CartModel.findByBuyerId(id);

      if (!cart) {
        cart = await CartModel.createCart(id);
      }

      const { product_id, quantity } = req.body;
      const cartItem = await CartItemsModel.addItem(
        cart.cart_id,
        product_id,
        quantity
      );
      res.status(201).json(cartItem);
    } catch (error) {
      next(error);
    }
  },

  async updateQuantity(req, res, next) {
    try {
      const id = req.user.id;
      const { quantity } = req.body;
      const { cart_item_id } = req.params;

      const cart = await CartModel.findByBuyerId(id);

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const cartItem = await CartItemsModel.getCartItem(cart_item_id);

      if (!cartItem) {
        return res.status(404).json({ message: "Item not found in the cart" });
      }

      const updatedCartItem = await CartItemsModel.updateQuantity(
        cart_item_id,
        quantity
      );

      res.json(updatedCartItem);
    } catch (error) {
      next(error);
    }
  },

  async remove(req, res, next) {
    try {
      const id = req.user.id;
      const { cart_item_id } = req.params;

      const cart = await CartModel.findByBuyerId(id);

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const cartItem = await CartItemsModel.getCartItem(cart_item_id);

      if (!cartItem) {
        return res.status(404).json({ message: "Item not found in the cart" });
      }

      const removedItem = await CartItemsModel.removeItem(cart_item_id);
      res.json({ message: "Item removed from cart", removedItem });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = CartController;
