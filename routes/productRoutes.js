const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

// Product routes
router.get("/", ProductController.findAll);
router.get("/:id", ProductController.findById);
router.post("/", authMiddleware, ProductController.createProduct);
router.put("/:id", authMiddleware, ProductController.updateProduct);
router.delete("/:id", authMiddleware, ProductController.deleteProduct);

module.exports = router;
