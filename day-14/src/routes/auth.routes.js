const express = require("express");
const authRouter = express.Router(); // Create router instance
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken"); // Import JWT for token creation
const crypto = require("crypto"); // Import crypto for hashing passwords


// Register route
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists with email
  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    res.status(400).json({
      message: "User already exists with this email",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  // Create a new user in db
  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  // Generate JWT token with user data
  const token = jwt.sign(
    { user: user._id, email: user.email },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token); // Store token in browser cookie

  res.status(201).json({
    message: "User Registered Successfully",
    user,
    token,
  });
});


// This Protected route Read's cookies sent by client
authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);

  res.status(200).json({
    message: "This is protected route",
  });
});


// This route Get's login credentials of existing user
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists with email
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found with this email",
    });
  }

  // Compare hashed password with stored password
  const isPasswordValid =
    user.password === crypto.createHash("md5").update(password).digest("hex");
  
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  // Generate new JWT token after successful login
  const token = jwt.sign(
    { user: user._id, email: user.email },
    process.env.JWT_SECRET,
  );

  // Save token in cookie
  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User Logged in successfully",
    user,
    token,
  });
});


module.exports = authRouter;
