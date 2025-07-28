// controllers/orderController.js
const Order = require("../models/Order");
const Product = require("../models/Product");
const mongoose = require("mongoose");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
