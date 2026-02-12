const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs"); // Import ImageKit package to upload images
const { toFile } = require("@imagekit/nodejs"); // Import helper function to convert buffer into file format

// Create ImageKit instance using private key from .env file
const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Controller to create a new post
async function createPostController(req, res) {
  console.log(req.body, req.file);

  // Upload image file to ImageKit
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Image",
  });

  // Send uploaded file details as response
  res.send(file);
}

module.exports = {
  createPostController,
};
