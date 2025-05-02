import mongoose from "mongoose";

// Assuming User and Resource models are defined elsewhere and imported
// import User from './user.model.js'; // Example import
import Resource from "./resource.model.js"; // Example import

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // Reference the User model
      required: true,
    },
    resource: {
      type: mongoose.Schema.ObjectId,
      ref: "Resource", // Reference the Resource model
      required: true,
    },
    // Potential future additions:
    // upvotes: { type: Number, default: 0 },
    // replies: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }]
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  },
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
