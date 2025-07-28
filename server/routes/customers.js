const express = require("express")
const Customer = require("../models/Customer")

const router = express.Router()


router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find({})
    console.log(`Found ${customers.length} customers`)
    res.json(customers)
  } catch (error) {
    console.error("Error fetching customers:", error)
    res.status(500).json({ error: "Failed to fetch customers" })
  }
})


router.post("/", async (req, res) => {
  try {
    const customer = new Customer(req.body)
    await customer.save()
    console.log(`Created customer: ${customer.name}`)
    res.status(201).json(customer)
  } catch (error) {
    console.error("Error creating customer:", error)
    res.status(500).json({ error: "Failed to create customer" })
  }
})

module.exports = router
