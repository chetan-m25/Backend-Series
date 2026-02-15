const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs"); // Import ImageKit package to upload images
const { toFile } = require("@imagekit/nodejs"); // Import helper function to convert buffer into file format
const jwt = require("jsonwebtoken");

// Create ImageKit instance using private key from .env file
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Controller to create a new post
async function createPostController(req, res) {
  // Check if token is provided in cookies
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Token not provided, Unauthorized Access",
    });
  }

  // Verify JWT token and return error if token is invalid or expired
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "User not logged in or Unauthorized Access",
    });
  }

  // Upload image file to ImageKit
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Image",
    folder: "insta-project/posts",
  });

  // Create new post in database
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  // Send success response with created post data
  res.status(201).json({
    message: "Post created Successfully",
    post,
  });
}

// Get all posts of logged-in user after verifying JWT token
async function getPostController(req, res) {
  // Check if token is provided in cookies
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Token not found , UnAuthorized Access",
    });
  }

  // Verify JWT token and return error if token is invalid or expired
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Token invalid",
    });
  }

  // Extract user ID from decoded token
  const userId = decoded.id;

  // Find all posts created by this user
  const posts = await postModel.find({
    user: userId,
  });

  // Send posts as response
  res.status(200).json({
    message: "Posts Fetched Successfully",
    posts,
  });
}

// Get single post details if user is authorized
async function getPostDetailsController(req, res) {
  // Check token is provided, If missing deny unauthorized access
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Token not found , UnAuthorized Access",
    });
  }

  // Verify JWT token and return error if token is invalid or expired
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "UnAuthorized Access",
    });
  }

  const userId = decoded.id; // Extract user ID from token
  const postId = req.params.postId; // Get post ID from URL parameters

  // Find post by its ID
  const post = await postModel.findById(postId);

  // If post does not exist, return 404 error
  if (!post) {
    return res.status(404).json({
      message: "Post not Found",
    });
  }

  // Allow only if post belongs to logged-in user
  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  // Send post details if everything is valid
  res.status(200).json({
    message: "Post Fetched Successfully",
    post,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
