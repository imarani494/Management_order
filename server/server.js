const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const morgan = require("morgan")
const http = require("http")
const socketIo = require("socket.io")
require("dotenv").config()

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:5173"], 
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  },
})


const authRoutes = require("./routes/auth")
const orderRoutes = require("./routes/orders")
const productRoutes = require("./routes/products")
const customerRoutes = require("./routes/customers")
const statsRoutes = require("./routes/stats")


app.use(helmet())


app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use(morgan("combined"))
app.use(express.json())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
})
app.use(limiter)


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/oms"

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB")
})

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err)
})


io.on("connection", (socket) => {
  console.log("Client connected:", socket.id)

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id)
  })
})


app.use((req, res, next) => {
  req.io = io
  next()
})


app.use("/api/auth", authRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/products", productRoutes)
app.use("/api/customers", customerRoutes)
app.use("/api/stats", statsRoutes)


app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    cors: "Only local frontend allowed",
  })
})


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})


app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`CORS enabled for http://localhost:5173`)
})

module.exports = { app, io }
