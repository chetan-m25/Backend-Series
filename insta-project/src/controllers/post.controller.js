const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs"); // Import ImageKit package to upload images
const { toFile } = require("@imagekit/nodejs"); // Import helper function to convert buffer into file format
const likeModel = require("../models/like.model");
const saveModel = require("../models/save.model");

// Create ImageKit instance using private key from .env file
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Controller to create a new post
async function createPostController(req, res) {
  // Check if file is uploaded
  if (!req.file) {
    return res.status(400).json({
      message: "Please upload an image",
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

// Controller to get feed of all posts with like status for loggedIn user
async function getFeedController(req, res) {
  const user = req.user;

  // Use Promise.all to wait for all posts to be processed with like status
  const posts = await Promise.all(
    (
      await postModel
        .find() // Fetch all posts
        .populate("user") // Populate user details for each post
        .lean() // Convert Mongoose documents to plain JavaScript objects
        .sort({ createdAt: -1 })
    ) // Sort posts by creation date in descending order

      // Map over each post to check if the loggedIn user has liked it
      .map(async (post) => {
        // count total likes
        const likesCount = await likeModel.countDocuments({ post: post._id });

        // Check if loggedIn user has liked this post
        const isLiked = await likeModel.findOne({
          user: user.username,
          post: post._id,
        });

        // count saved state for this user
        const isSaved = await saveModel.findOne({
          user: user.username,
          post: post._id,
        });

        // Add likesCount count, isLiked and isSaved property to post object
        post.likesCount = likesCount;
        post.isLiked = Boolean(isLiked);
        post.isSaved = Boolean(isSaved);

        return post; // Return the modified post object
      }),
  );

  res.status(200).json({
    message: "Posts Fetched Successfully",
    posts,
  });
}

// Controller to save a post (bookmark)
async function savePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const alreadySaved = await saveModel.findOne({
    post: postId,
    user: username,
  });

  if (alreadySaved) {
    return res.status(400).json({
      message: "Post already saved",
    });
  }

  const savedPost = await saveModel.create({
    post: postId,
    user: username,
  });

  res.status(201).json({
    message: "Post saved Successfully",
    savedPost,
  });
}

// Controller to unsave a post (remove bookmark)
async function unsavePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const saved = await saveModel.findOne({
    post: postId,
    user: username,
  });

  if (!saved) {
    return res.status(400).json({
      message: "Post not saved",
    });
  }

  await saveModel.findByIdAndDelete(saved._id);

  res.status(200).json({
    message: "Post unsaved successfully",
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  unlikePostController,
  getFeedController,
  savePostController,
  unsavePostController,
};
