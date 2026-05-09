const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../utils/passwordManager");
const { signToken } = require("../utils/jwtManager");
const { validateSignup } = require("../utils/validators");
const { findInFile, addToFile } = require("../utils/jsonFileManager");

const router = express.Router();

/**
 * POST /auth/signup
 * Register a new user
 * Body: { name, email, password }
 */
router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    const validation = validateSignup({ name, email, password });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Check if user already exists
    const existingUser = await findInFile(
      "users.json",
      "email",
      email.toLowerCase(),
    );
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
        errors: { email: "Email already registered" },
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user object
    const newUser = {
      id: uuidv4(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    // Save to users.json
    await addToFile("users.json", newUser);

    // Create JWT token
    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
    });

    // Return success with user data (without password)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    next(error);
  }
});

module.exports = router;
