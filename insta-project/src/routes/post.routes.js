const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");

// Route to create a post with single image upload
postRouter.post(
  "/",
  upload.single("image"), // Upload one image from form field named "image"
  identifyUser,
  postController.createPostController, // Call controller to handle post creation
);

// Route to get all posts of logged-in user
postRouter.get("/", identifyUser, postController.getPostController);

// Route to get details of a specific post by postId
postRouter.get(
  "/details/:postId",
  identifyUser, // Middleware to identify user from JWT token
  postController.getPostDetailsController,
);

// Route to like a post by postId
postRouter.post(
  "/like/:postId",
  identifyUser,
  postController.likePostController,
);

// Route to unlike a post by postId
postRouter.post(
  "/unlike/:postId",
  identifyUser,
  postController.unlikePostController,
);

// Route to save a post by postId
postRouter.post(
  "/save/:postId",
  identifyUser,
  postController.savePostController,
);

// Route to unsave a post by postId
postRouter.post(
  "/unsave/:postId",
  identifyUser,
  postController.unsavePostController,
);

module.exports = postRouter;
