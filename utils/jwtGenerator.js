const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateJWT(userId, role) {
  const payload = {
    user: {
      id: userId,
      role: role,
    },
  };

  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1h" });
}

function generateRefreshToken(userId) {
  const payload = {
    user: {
      id: userId,
    },
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}
module.exports = { generateJWT, generateRefreshToken };
