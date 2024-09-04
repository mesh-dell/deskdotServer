const express = require("express");
const router = express.Router();
const CartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

// Cart routes
router.get("/", authMiddleware, CartController.getCart);
router.post("/items", authMiddleware, CartController.addToCart);
router.put(
  "/items/:cart_item_id",
  authMiddleware,
  CartController.updateQuantity
);
router.delete("/items/:cart_item_id", authMiddleware, CartController.remove);

module.exports = router;
