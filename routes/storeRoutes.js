const express = require("express");
const router = express.Router();
const StoreController = require("../controllers/storeController");
const OrderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", StoreController.getAllStores);
router.get("/orders", authMiddleware, OrderController.getSellerOrders);
router.get("/:id", StoreController.getStore);
router.get("/:id/products", StoreController.getStoreProducts);

module.exports = router;
