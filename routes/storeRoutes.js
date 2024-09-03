const express = require("express");
const router = express.Router();
const StoreController = require("../controllers/storeController");

router.get("/", StoreController.getAllStores);

router.get("/:id", StoreController.getStore);

router.get("/:id/products", StoreController.getStoreProducts);

module.exports = router;
