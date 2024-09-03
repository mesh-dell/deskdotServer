const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Product routes
router.get("/", ProductController.findAll);
router.get("/:product_id", ProductController.findById);
router.post("/", authMiddleware, ProductController.createProduct);
router.put("/:product_id", authMiddleware, ProductController.updateProduct);
router.delete("/:product_id", authMiddleware, ProductController.deleteProduct);

module.exports = router;
