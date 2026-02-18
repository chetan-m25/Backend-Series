const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Controller for user registration
async function registerController(req, res) {
  // Get user data from request body
  const { username, email, password, profileImage, bio } = req.body;

  // Check if user already exists with same username OR email
  const isUserExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  // If user already exists, return error
  if (isUserExists) {
    return res.status(409).json({
      message:
        "User already exists" +
        (isUserExists.email === email
          ? " with this email"
          : " with this username"),
    });
  }

  // Hash the password before saving (10 = salt rounds)
  const hash = await bcrypt.hash(password, 10);

  // Create new user in database
  const user = await userModel.create({
    username,
    email,
    password: hash, // Save hashed password
    profileImage,
    bio,
  });

  // Generate JWT token (valid for 1 day)
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  // Store token in cookies
  res.cookie("token", token);

  // Send success response (without password)
  res.status(200).json({
    message: "User Registered Successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

// Controller for user login
async function loginController(req, res) {
  // Get login data from request body
  const { username, email, password } = req.body;

  // Find user by username OR email
  const userLogin = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  // If user not found, return error
  if (!userLogin) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Compare entered password with hashed password
  const isPasswordValid = await bcrypt.compare(password, userLogin.password);

  // If password is incorrect, return error
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  // Generate JWT token after successful login
  const token = jwt.sign(
    {
      id: userLogin._id,
      username: userLogin.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  // Store token in cookies
  res.cookie("token", token);

  // Send success response (without password)
  res.status(200).json({
    message: "User loggedIn Successfully",
    user: {
      username: userLogin.username,
      email: userLogin.email,
      bio: userLogin.bio,
      profileImage: userLogin.profileImage,
    },
  });
}

module.exports = { registerController, loginController };
