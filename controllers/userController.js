const BuyerModel = require("../models/buyerModel");
const SellerModel = require("../models/sellerModel");

const ROLES = {
  BUYER: "buyer",
  SELLER: "seler",
};

const getUserModel = (role) => {
  return role === ROLES.BUYER ? BuyerModel : SellerModel;
};

const userController = {
  async getProfile(req, res, next) {
    try {
      const { role, userId } = req.user;
      const UserModel = getUserModel(role);
      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        id: userId,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        ...(role === ROLES.SELLER && {
          store_name: user.store_name,
          store_description: user.store_description,
        }),
        role,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req, res, next) {
    try {
      const { role, userId } = req.user;

      const { first_name, last_name, email, store_name, store_description } =
        req.body;

      const UserModel = getUserModel(role);

      const user = await UserModel.updateProfile(userId, {
        first_name,
        last_name,
        email,
        ...(role == ROLES.SELLER && { store_name, store_description }),
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        message: "Profile updated succesfully",
        user: {
          id: userId,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          ...(role === "seller" && {
            store_name: user.store_name,
            store_description: user.store_description,
          }),
          role,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
