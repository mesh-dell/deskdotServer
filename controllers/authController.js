const bcrypt = require("bcrypt");
const BuyerModel = require("../models/buyerModel");
const SellerModel = require("../models/sellerModel");
const { generateJWT, generateRefreshToken } = require("../utils/jwtGenerator");
const jwt = require("jsonwebtoken");

const AuthController = {
  async register(req, res, next) {
    try {
      const {
        first_name,
        last_name,
        password,
        email,
        role,
        store_name,
        store_description,
      } = req.body;

      const UserModel = role == "buyer" ? BuyerModel : SellerModel;

      // Check if user already exists
      const existingUser = await UserModel.findByEmail(email);

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //Create new user
      const user =
        role == "buyer"
          ? await BuyerModel.createBuyer(
              first_name,
              last_name,
              hashedPassword,
              email
            )
          : await SellerModel.createSeller(
              first_name,
              last_name,
              hashedPassword,
              email,
              store_name,
              store_description
            );

      const userId = role == "buyer" ? user.buyer_id : user.seller_id;
      //Generate tokens
      const accessToken = generateJWT(userId, role);
      const refreshToken = generateRefreshToken(userId);

      //Store refresh token to database
      await UserModel.saveRefreshToken(userId, refreshToken);

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: userId,
          first_name: user.first_name,
          email: user.email,
          role: role,
          ...(role === "seller" && {
            store_name: user.store_name,
            store_description: user.store_description,
          }),
        },
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password, role } = req.body;

      const UserModel = role == "buyer" ? BuyerModel : SellerModel;

      // Check if user exists
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const userId = role == "buyer" ? user.buyer_id : user.seller_id;

      // Generate tokens
      const accessToken = generateJWT(userId, role);
      const refreshToken = generateRefreshToken(userId);

      // Save token refresh to database
      await UserModel.saveRefreshToken(userId, refreshToken);

      res.json({
        message: "Logged in succesfully",
        user: {
          id: userId,
          first_name: user.first_name,
          email: user.email,
          role: role,
          ...(role == "seller" && {
            store_name: user.store_name,
            store_description: user.store_description,
          }),
        },
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req, res, next) {
    try {
      const { refreshToken, role } = req.body;
      const UserModel = role == "buyer" ? BuyerModel : SellerModel;

      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
      }

      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      // Check if refresh token exists in database
      const user = await UserModel.findByRefreshToken(refreshToken);
      if (!user) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }

      // Generate new access token
      const userId = role == "buyer" ? user.buyer_id : user.seller_id;
      const accessToken = generateJWT(userId, role);

      res.json({ accessToken });
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(403).json({ message: "Refresh token expired" });
      }
      next(error);
    }
  },

  async logout(req, res, next) {
    try {
      const { refreshToken, role } = req.body;

      const UserModel = role == "buyer" ? BuyerModel : SellerModel;

      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token is required" });
      }

      // Remove refresh token from database
      await UserModel.removeRefreshToken(refreshToken);

      res.json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AuthController;
