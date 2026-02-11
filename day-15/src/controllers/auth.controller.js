const userModel = require("../models/user.model"); // Import user model to interact with database
const jwt = require("jsonwebtoken"); // Import JWT for token creation
const crypto = require("crypto"); // Import crypto for hashing passwords


// Register Controller
async function registerController(req, res) {
  const { name, email, password } = req.body;

  // Check if user already exists with email
  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    res.status(400).json({
      message: "User already exists with this email",
    });
  }

  // Hash the provided password
  const hash = crypto.createHash("sha256").update(password).digest("hex");

  // Create a new user in db
  const user = await userModel.create({
    name,
    email,
    password: hash,
  });

  // Generate JWT token with user dat
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token); // Store token in browser cookie

  res.status(201).json({
    message: "User Registered Successfully",
    user: {
      user: user.name,
      email: user.email,
    },
  });
}


// Get Me Controller, returns currently logged-in user details
async function getmeController(req, res) {

  // Get JWT token from cookies
  const token = req.cookies.token;

  // Verify token and extract user id
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Find user in database using decoded id
  const user = await userModel.findById(decoded.id);

  res.json({
    name: user.name,
    email: user.email,
  });
}


// Login Controller
async function loginController(req, res) {
  const { email, password } = req.body;

  // Check if user exists with email
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User is not found",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  // Compare hashed password with stored password
  const isValidPassword = hash === user.password;
  if (!isValidPassword) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  // Generate new JWT token after successful login
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Save token in cookie
  res.cookie("token", token);

  res.status(200).json({
    message: "Usre Logged in Successfully",
    user: {
      user: user.name,
      email: user.email,
    },
  });
}


module.exports = {
  registerController,
  getmeController,
  loginController,
};
