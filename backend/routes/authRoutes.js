const express = require("express");
const bcrypt = require("bcryptjs");
const yup = require("yup");
const User = require("../models/User");

const router = express.Router();

// ✅ Validation Schema
const signupSchema = yup.object({
  name: yup.string().min(2).max(50).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  roleId: yup.string().optional(),
  orgId: yup.string().optional(),
});

// ✅ Signup API
router.post("/signup", async (req, res) => {
  try {
    // 1️⃣ Validate input
    await signupSchema.validate(req.body);

    const { name, email, password, roleId, orgId } = req.body;

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      roleId,
      orgId,
    });

    await newUser.save();

    // 5️⃣ Success response
    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.errors });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
