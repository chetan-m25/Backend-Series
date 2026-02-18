const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs"); // Import ImageKit package to upload images
const { toFile } = require("@imagekit/nodejs"); // Import helper function to convert buffer into file format
const jwt = require("jsonwebtoken");
const likeModel = require("../models/like.model");

// Create ImageKit instance using private key from .env file
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Controller to create a new post
async function createPostController(req, res) {
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
    user: req.user.id,
  });

  // Send success response with created post data
  res.status(201).json({
    message: "Post created Successfully",
    post,
  });
}

// Get all posts of logged-in user after verifying JWT token
async function getPostController(req, res) {
  // Extract user ID from decoded token
  const userId = req.user.id;

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
  const userId = req.user.id; // Get logged-in user id (from auth middleware)
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

// Controller to like a post
async function likePostController(req, res) {
  const username = req.user.username; // Get logged-in username (from auth middleware)
  const postId = req.params.postId; // Get post ID from URL

  // Check if post exists
  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not Found",
    });
  }

  // Create like record for this user and post
  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  // Send success response
  res.status(200).json({
    message: "Post Liked",
    like,
  });
}

async function unlikePostController(req, res) {
  const username = req.user.username; // Get logged-in user's username
  const postId = req.params.postId; // Get post ID from URL

  // Check if post exists
  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not Found",
    });
  }

  // Find like record for this user and post
  const like = await likeModel.findOne({
    post: postId,
    user: username,
  });

  // If user has not liked this post
  if (!like) {
    return res.status(400).json({
      message: "You have not liked this post",
    });
  }

  // Delete the like record (unlike)
  await likeModel.findByIdAndDelete(like._id);

  // Send success response
  res.status(200).json({
    message: "Post Unliked",
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  unlikePostController,
};
