const SellerModel = require("../models/sellerModel");
const ProductModel = require("../models/productModel");

const StoreController = {
  async getAllStores(req, res, next) {
    try {
      const stores = await SellerModel.getAllStores();

      res.json({
        stores: stores.map((store) => ({
          store_name: store.store_name,
          store_description: store.store_description,
          seller_id: store.seller_id,
        })),
      });
    } catch (error) {
      next(error);
    }
  },

  async getStore(req, res, next) {
    try {
      const { id } = req.params;
      
      const store = await SellerModel.findById(id);

      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }

      res.json({
        store_name: store.store_name,
        store_description: store.store_description,
        seller_id: store.seller_id,
      });
    } catch (error) {
      next(error);
    }
  },

  async getStoreProducts(req, res, next) {
    try {
      const { id } = req.params;
      const store = await SellerModel.findById(id);
      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }
      const products = await ProductModel.findBySellerId(id);

      res.json({
        store_name: store.store_name,
        store_description: store.store_description,
        products: products.map((product) => ({
          product_id: product.product_id,
          product_name: product.product_name,
          price: product.price,
          quantity: product.quantity,
          description: product.product_description,
        })),
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = StoreController;
