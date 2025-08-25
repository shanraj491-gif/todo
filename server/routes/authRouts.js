const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Models/User.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "email already exists" });
    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ message: "Username already taken" });

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

  
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
});


module.exports= router;