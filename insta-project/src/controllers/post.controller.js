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
  let decoded = null;
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
    caption: req.body.captio,
    imgUrl: file.url,
    user: decoded.id,
  });

  // Send success response with created post data
  res.status(201).json({
    message: "Post created Successfully",
    post,
  });
}

module.exports = {
  createPostController,
};
