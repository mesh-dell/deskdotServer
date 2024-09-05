const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, orderController.createOrder);
router.get("/", authMiddleware, orderController.getUserOrders);
router.get("/:order_id", authMiddleware, orderController.getOrder);
// Change order status (for seller)
router.put(
  "/:order_item_id/status",
  authMiddleware,
  orderController.updateStatus
);
router.delete("/:order_id/cancel", authMiddleware, orderController.cancelOrder);

module.exports = router;
