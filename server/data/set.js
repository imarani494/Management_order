const mongoose = require("mongoose")
const Product = require("../models/Product")
const Customer = require("../models/Customer")
const Order = require("../models/Order")
require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/oms"

async function set() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("Connected to MongoDB")

 =
    await Product.deleteMany({})
    await Customer.deleteMany({})
    await Order.deleteMany({})

    console.log("Cleared existing data")

   
    const products = [
      {
        name: "Laptop Computer",
        description: "High-performance laptop for business use",
        price: 999.99,
        stock: 50,
        sku: "LAP-001",
        category: "Electronics",
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse",
        price: 29.99,
        stock: 100,
        sku: "MOU-001",
        category: "Accessories",
      },
      {
        name: "USB-C Cable",
        description: "High-speed USB-C charging cable",
        price: 19.99,
        stock: 200,
        sku: "CAB-001",
        category: "Accessories",
      },
      {
        name: "Monitor Stand",
        description: "Adjustable monitor stand",
        price: 79.99,
        stock: 75,
        sku: "STA-001",
        category: "Accessories",
      },
      {
        name: "Mechanical Keyboard",
        description: "Mechanical keyboard with RGB lighting",
        price: 149.99,
        stock: 60,
        sku: "KEY-001",
        category: "Accessories",
      },
    ]

    const insertedProducts = await Product.insertMany(products)
    console.log(`✅ Inserted ${insertedProducts.length} products`)

   
    const customers = [
      {
        name: "John Doe",
        email: "john.doe@email.com",
        phone: "+1-555-0123",
        address: "123 Main St, Anytown, USA 12345",
      },
      {
        name: "Jane Smith",
        email: "jane.smith@email.com",
        phone: "+1-555-0124",
        address: "456 Oak Ave, Somewhere, USA 67890",
      },
      {
        name: "Bob Johnson",
        email: "bob.johnson@email.com",
        phone: "+1-555-0125",
        address: "789 Pine Rd, Elsewhere, USA 54321",
      },
      {
        name: "Alice Wilson",
        email: "alice.wilson@email.com",
        phone: "+1-555-0126",
        address: "321 Elm St, Nowhere, USA 98765",
      },
    ]

    const insertedCustomers = await Customer.insertMany(customers)
    console.log(`✅ Inserted ${insertedCustomers.length} customers`)

    // Seed sample orders with realistic data
    const orders = [
      {
        orderId: "ORD-00001",
        customerName: "John Doe",
        customerEmail: "john.doe@email.com",
        shippingAddress: "123 Main St, Anytown, USA 12345",
        items: [
          {
            productId: insertedProducts[0]._id,
            productName: insertedProducts[0].name,
            quantity: 1,
            price: insertedProducts[0].price,
          },
          {
            productId: insertedProducts[1]._id,
            productName: insertedProducts[1].name,
            quantity: 2,
            price: insertedProducts[1].price,
          },
        ],
        totalAmount: insertedProducts[0].price + insertedProducts[1].price * 2,
        status: "shipped",
        paymentCollected: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        updatedAt: new Date(),
      },
      {
        orderId: "ORD-00002",
        customerName: "Jane Smith",
        customerEmail: "jane.smith@email.com",
        shippingAddress: "456 Oak Ave, Somewhere, USA 67890",
        items: [
          {
            productId: insertedProducts[2]._id,
            productName: insertedProducts[2].name,
            quantity: 3,
            price: insertedProducts[2].price,
          },
        ],
        totalAmount: insertedProducts[2].price * 3,
        status: "picked",
        paymentCollected: true,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        updatedAt: new Date(),
      },
      {
        orderId: "ORD-00003",
        customerName: "Bob Johnson",
        customerEmail: "bob.johnson@email.com",
        shippingAddress: "789 Pine Rd, Elsewhere, USA 54321",
        items: [
          {
            productId: insertedProducts[3]._id,
            productName: insertedProducts[3].name,
            quantity: 1,
            price: insertedProducts[3].price,
          },
          {
            productId: insertedProducts[4]._id,
            productName: insertedProducts[4].name,
            quantity: 1,
            price: insertedProducts[4].price,
          },
        ],
        totalAmount: insertedProducts[3].price + insertedProducts[4].price,
        status: "placed",
        paymentCollected: false,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        updatedAt: new Date(),
      },
      {
        orderId: "ORD-00004",
        customerName: "Alice Wilson",
        customerEmail: "alice.wilson@email.com",
        shippingAddress: "321 Elm St, Nowhere, USA 98765",
        items: [
          {
            productId: insertedProducts[0]._id,
            productName: insertedProducts[0].name,
            quantity: 2,
            price: insertedProducts[0].price,
          },
        ],
        totalAmount: insertedProducts[0].price * 2,
        status: "delivered",
        paymentCollected: true,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        updatedAt: new Date(),
      },
      {
        orderId: "ORD-00005",
        customerName: "John Doe",
        customerEmail: "john.doe@email.com",
        shippingAddress: "123 Main St, Anytown, USA 12345",
        items: [
          {
            productId: insertedProducts[4]._id,
            productName: insertedProducts[4].name,
            quantity: 1,
            price: insertedProducts[4].price,
          },
          {
            productId: insertedProducts[1]._id,
            productName: insertedProducts[1].name,
            quantity: 1,
            price: insertedProducts[1].price,
          },
        ],
        totalAmount: insertedProducts[4].price + insertedProducts[1].price,
        status: "shipped",
        paymentCollected: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        updatedAt: new Date(),
      },
    ]

    const insertedOrders = await Order.insertMany(orders)
    console.log(`✅ Inserted ${insertedOrders.length} orders`)

    console.log("\n🎉 Database seeded successfully!")
    console.log("\n📋 Sample Order IDs for testing:")
    insertedOrders.forEach((order) => {
      console.log(`   - ${order.orderId} (${order.status})`)
    })

    console.log("\n🔐 Admin Login Credentials:")
    console.log("   Email: admin@oms.com")
    console.log("   Password: admin123")

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

set()
