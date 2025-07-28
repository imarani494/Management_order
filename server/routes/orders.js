const express = require("express")
const mongoose = require("mongoose")
const Order = require("../models/Order")
const Product = require("../models/Product")

const router = express.Router()


router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 })
    console.log(`Found ${orders.length} orders`)
    res.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    res.status(500).json({ error: "Failed to fetch orders" })
  }
})


router.get("/:id", async (req, res) => {
  try {
    console.log(`Looking for order: ${req.params.id}`)

    const order = await Order.findOne({
      $or: [{ _id: mongoose.Types.ObjectId.isValid(req.params.id) ? req.params.id : null }, { orderId: req.params.id }],
    })

    if (!order) {
      console.log(`Order not found: ${req.params.id}`)
      return res.status(404).json({ error: "Order not found" })
    }

    console.log(`Found order: ${order.orderId}`)
    res.json(order)
  } catch (error) {
    console.error("Error fetching order:", error)
    res.status(500).json({ error: "Failed to fetch order" })
  }
})


router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, shippingAddress, items, paymentCollected } = req.body

  
    const orderCount = await Order.countDocuments()
    const orderId = `ORD-${String(orderCount + 1).padStart(5, "0")}`

  
    let totalAmount = 0
    const processedItems = []

    for (const item of items || []) {
      if (item.productId && item.quantity > 0) {
        const product = await Product.findById(item.productId)
        if (product && product.stock >= item.quantity) {
        
          product.stock -= item.quantity
          await product.save()

          processedItems.push({
            productId: item.productId,
            productName: product.name,
            quantity: item.quantity,
            price: product.price,
          })

          totalAmount += product.price * item.quantity
        }
      }
    }

    const order = new Order({
      orderId,
      customerName,
      customerEmail,
      shippingAddress,
      items: processedItems,
      totalAmount,
      paymentCollected: paymentCollected || false,
      status: "placed",
    })

    await order.save()

   
    if (req.io) {
      req.io.emit("orderCreated", order)
    }

    console.log(`Created order: ${orderId}`)
    res.status(201).json(order)
  } catch (error) {
    console.error("Error creating order:", error)
    res.status(500).json({ error: "Failed to create order" })
  }
})


router.patch("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }

   e
    if (req.io) {
      req.io.emit("orderUpdated", order)
    }

    console.log(`Updated order: ${order.orderId}`)
    res.json(order)
  } catch (error) {
    console.error("Error updating order:", error)
    res.status(500).json({ error: "Failed to update order" })
  }
})

module.exports = router
