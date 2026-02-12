const mongoose = require("mongoose");

// Create schema (structure) for posts collection
const postSchema = new mongoose.Schema({
  // Caption of the post (optional, default empty)
  caption: {
    type: String,
    default: "",
  },
  // Image URL (required to create a post)
  imgUrl: {
    type: String,
    required: [true, "Image URL is required for creating post"],
  },
  // Reference to the user who created the posty
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "User id is required for creating post"],
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
