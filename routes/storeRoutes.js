const express = require("express");
const router = express.Router();
const StoreController = require("../controllers/storeController");
const OrderController = require("../controllers/orderController");

router.get("/", StoreController.getAllStores);
router.get("/:id", StoreController.getStore);
router.get("/:id/products", StoreController.getStoreProducts);
router.get("/orders", OrderController.getSellerOrders);

module.exports = router;
