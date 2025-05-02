import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    supabaseUserId: {
      type: String,
      required: true,
      unique: true, // Ensure Supabase ID is unique
      index: true, // Add index for faster lookups
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    avatarUrl: {
      type: String,
      trim: true, // Trim whitespace
      default: null, // Allow null or provide a default avatar
    },
    // Add any other fields you might want to store
    // e.g., email, createdAt, updatedAt
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt
  },
);

const User = mongoose.model("User", userSchema);

export default User;
