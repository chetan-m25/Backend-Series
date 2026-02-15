const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

// Route to create a post with single image upload
postRouter.post(
  "/",
  upload.single("image"), // Upload one image from form field named "image"
  postController.createPostController, // Call controller to handle post creation
);

// Route to get all posts of logged-in user
postRouter.get("/", postController.getPostController);

// Route to get details of a specific post by postId
postRouter.get("/details/:postId", postController.getPostDetailsController);

module.exports = postRouter;
