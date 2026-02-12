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

module.exports = postRouter;
