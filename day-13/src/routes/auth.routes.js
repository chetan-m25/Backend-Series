const express = require("express");
const authRouter = express.Router();   // Create router instance
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");  // Import JWT for token creation


authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;  // Get data from request body

  // Check if user already exists with email
  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    res.status(400).json({
      message: "User already exists with this email address",
    });
  }

  // Create a new user in db
  const user = await userModel.create({
    name,
    email,
    password,
  });

   // Generate JWT token with user data
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);  // Store token in browser cookie

  res.status(201).json({
    message: "User Registered Successfully",
    user,
    token,
  });

});

module.exports = authRouter;
