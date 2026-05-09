const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { hashPassword, comparePasswords } = require("../utils/passwordManager");
const { signToken } = require("../utils/jwtManager");
const { validateSignup, validateLogin } = require("../utils/validators");
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

/**
 * POST /auth/login
 * Authenticate user and return JWT token
 * Body: { email, password }
 */
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const validation = validateLogin({ email, password });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    // Find user by email
    const user = await findInFile("users.json", "email", email.toLowerCase());
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password with stored hash
    const passwordMatch = await comparePasswords(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT token
    const token = signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    // Return success with user data (without password)
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
});

module.exports = router;
