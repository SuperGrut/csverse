import mongoose from "mongoose";
// Assuming User and Comment models are defined elsewhere and imported
// import User from './user.model.js'; // Example import
// import Comment from './comment.model.js'; // Example import

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    type: {
      type: String,
      enum: ["video", "playlist"],
      required: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnailURL: {
      type: String,
      required: true,
      trim: true,
    },
    publishedAt: {
      type: Date,
    },
    description: {
      type: String,
      trim: true,
    },
    channelTitle: {
      type: String,
      trim: true,
    },
    resourceLanguage: {
      type: String,
      trim: true,
      // Consider adding enum validation if specific languages are expected
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      },
    ],
    submittedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
