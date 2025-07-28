const express = require("express")
const Product = require("../models/Product")

const router = express.Router()


router.get("/", async (req, res) => {
  try {
    const products = await Product.find({})
    console.log(`Found ${products.length} products`)
    res.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({ error: "Failed to fetch products" })
  }
})


router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    console.log(`Created product: ${product.name}`)
    res.status(201).json(product)
  } catch (error) {
    console.error("Error creating product:", error)
    res.status(500).json({ error: "Failed to create product" })
  }
})


router.patch("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    console.log(`Updated product: ${product.name}`)
    res.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    res.status(500).json({ error: "Failed to update product" })
  }
})

module.exports = router
