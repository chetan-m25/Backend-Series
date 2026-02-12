const mongoose = require("mongoose");

// Schema (structure) for the user collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "User name already exists"], // No duplicate usernames allowed
    required: [true, "User name is required"], // Username must be provided
  },
  email: {
    type: String,
    unique: [true, "Email already exists"], // No duplicate emails allowed
    required: [true, "Email is required"], // Email must be provided
  },
  password: {
    type: String,
    required: [true, "Password is required"], // Password must be provided
  },

  bio: String, // Bio field (optional)

  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/chetanm26/user.png", // Default profile picture
  },
});

// Model from the schema to interact with the Users collection
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
