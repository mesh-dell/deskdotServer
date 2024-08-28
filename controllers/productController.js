const ProductModel = require("../models/productModel");

const ProductController = {
  async createProduct(req, res) {
    try {
      const { seller_id, product_name, product_description, price, quantity } =
        req.body;
      const product = await ProductModel.createProduct(
        seller_id,
        product_name,
        product_description,
        price,
        quantity
      );
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async findById(req, res) {
    try {
      const product_id = req.params.product_id;
      const product = await ProductModel.findById(product_id);

      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async findAll(req, res) {
    try {
      const products = await ProductModel.getAllProducts();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async findBySellerId(req, res) {
    try {
      const seller_id = req.params.seller_id;
      const products = await ProductModel.findBySellerId(seller_id);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const { product_name, product_description, price, quantity } = req.body;

      const product = await ProductModel.updateProduct(
        req.params.product_id,
        product_name,
        product_description,
        price,
        quantity
      );

      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const product = await ProductModel.deleteProduct(req.params.product_id);

      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = ProductController;
