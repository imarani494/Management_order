const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://imaran:imaran@cluster0.ecsubbq.mongodb.net/oms?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// 🛣 Route Imports
const authRoutes = require("./routes/auth");
const orderRoutes = require("./routes/orders");
const productRoutes = require("./routes/products");
const customerRoutes = require("./routes/customers");
const statsRoutes = require("./routes/stats");

// 🧭 API Routes
app.use("/api/auth", authRoutes); // 🔐 Auth routes
app.use("/api/orders", orderRoutes); // 📦 Orders routes
app.use("/api/products", productRoutes); // 🛍 Products routes
app.use("/api/customers", customerRoutes); // 👥 Customers routes
app.use("/api/stats", statsRoutes); // 📊 Stats routes

// ✅ Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    time: new Date().toISOString()
  });
});

// ⚠️ 404 Handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// 🚀 Server Startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
