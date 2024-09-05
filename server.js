const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const storeRoutes = require("./routes/storeRoutes");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());

// Routes
app.use("/api/auth", authRoutes); // Authentication routes (login, register, refresh token, etc.)
app.use("/api/users", authMiddleware, userRoutes); // User routes (requires authentication)
app.use("/api/stores", storeRoutes); // Store routes (no auth required for public store browsing)
app.use("/api/products", productRoutes); // Product routes (store products)
app.use("/api/cart", authMiddleware, cartRoutes); // Cart routes (requires buyer auth)
app.use("/api/orders", authMiddleware, orderRoutes); // Order routes (requires buyer auth)

// Handle 404 errors (route not found)
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

// Error handling middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
