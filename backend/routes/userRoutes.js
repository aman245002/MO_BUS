const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// User Registration
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role: role || "User"  // Default role is "User"
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// User Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, "your_jwt_secret", { expiresIn: "1h" });

    res.json({ token, userId: user._id, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users (Admin only)
router.get("/all-users", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords for security
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Delete User (Admin Only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
