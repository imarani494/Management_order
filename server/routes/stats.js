const express = require("express")
const Order = require("../models/Order")
const Product = require("../models/Product")
const Customer = require("../models/Customer")

const router = express.Router()


router.get("/", async (req, res) => {
  try {
    const [totalOrders, totalRevenue, totalCustomers, totalProducts] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]),
      Customer.countDocuments(),
      Product.countDocuments(),
    ])

    const stats = {
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalCustomers,
      totalProducts,
    }

    console.log("Stats:", stats)
    res.json(stats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    res.status(500).json({ error: "Failed to fetch stats" })
  }
})

module.exports = router
