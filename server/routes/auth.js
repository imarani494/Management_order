const express = require("express")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

const router = express.Router()

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    console.log(`Login attempt for: ${email}`)

    // Demo authentication - replace with real user lookup
    if (email === "admin@oms.com" && password === "admin123") {
      const token = jwt.sign(
        { userId: "demo-admin", email, role: "admin" },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" },
      )

      console.log(`Login successful for: ${email}`)
      res.json({
        token,
        user: {
          id: "demo-admin",
          email,
          name: "Admin User",
          role: "admin",
        },
      })
    } else {
      console.log(`Login failed for: ${email}`)
      res.status(401).json({ error: "Invalid credentials" })
    }
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Server error" })
  }
})


router.get("/verify", auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user.userId,
        email: req.user.email,
        name: "Admin User",
        role: req.user.role,
      },
    })
  } catch (error) {
    console.error("Token verification error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router
