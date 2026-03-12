const mongoose = require("mongoose");

// Create schema for likes collection
const likeSchema = new mongoose.Schema(
  {
    // Store post ID (reference to posts collection)
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "post id is required for creating like"],
    },
    // Store username who liked the post
    user: {
      type: String,
      required: [true, "username is required for creating like"],
    },
  },

  { timestamps: true }, // Automatically adds createdAt and updatedAt
);

// Prevent duplicate likes (same user cannot like same post twice)
likeSchema.index({ post: 1, user: 1 }, { unique: true });

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;
