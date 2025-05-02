import mongoose from "mongoose";
import Comment from "../models/comment.model.js";
import Resource from "../models/resource.model.js";
// Assuming utility functions/classes exist and are imported similarly to resource.controller
import { asyncHandler, ApiError, ApiResponse } from "./resource.controller.js"; // Reusing placeholders from resource controller for brevity

const addCommentToResource = asyncHandler(async (req, res) => {
  const { resourceId } = req.params;
  const { content } = req.body;
  // Get user ID from middleware
  const userId = req.user?._id;
  if (!userId) {
    // This should be caught by middleware, but check just in case
    throw new ApiError(401, "User not authenticated to comment");
  }

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Comment content cannot be empty");
  }

  if (!mongoose.isValidObjectId(resourceId)) {
    throw new ApiError(400, "Invalid resource ID format");
  }

  // Check if resource exists
  const resource = await Resource.findById(resourceId);
  if (!resource) {
    throw new ApiError(404, "Resource not found");
  }

  const comment = await Comment.create({
    content,
    author: userId,
    resource: resourceId,
  });

  if (!comment) {
    throw new ApiError(500, "Failed to add comment");
  }

  // Add comment reference to the resource's comments array
  await Resource.findByIdAndUpdate(resourceId, {
    $push: { comments: comment._id },
  });

  // Populate author details before sending response
  await comment.populate("author", "username email"); // Adjust fields as needed

  return res
    .status(201)
    .json(new ApiResponse(201, comment, "Comment added successfully"));
});

const getResourceComments = asyncHandler(async (req, res) => {
  const { resourceId } = req.params;
  // TODO: Add pagination (e.g., using req.query.page, req.query.limit)

  if (!mongoose.isValidObjectId(resourceId)) {
    throw new ApiError(400, "Invalid resource ID format");
  }

  // Check if resource exists (optional, but good practice)
  const resourceExists = await Resource.findById(resourceId).select("_id");
  if (!resourceExists) {
    throw new ApiError(404, "Resource not found");
  }

  const comments = await Comment.find({ resource: resourceId })
    .populate("author", "username email") // Populate author details
    .sort({ createdAt: -1 }); // Sort by newest first

  return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  // Get user ID from middleware
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Comment content cannot be empty");
  }

  if (!mongoose.isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID format");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  // Authorization: Check if the logged-in user is the author of the comment
  if (comment.author.toString() !== userId.toString()) {
    throw new ApiError(403, "User not authorized to update this comment");
  }

  comment.content = content;
  await comment.save({ validateBeforeSave: true });

  // Populate author details before sending response
  await comment.populate("author", "username email"); // Adjust fields as needed

  return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  // Get user ID from middleware
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  if (!mongoose.isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid comment ID format");
  }

  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  // Authorization: Check if the logged-in user is the author of the comment
  // TODO: Add logic for resource owner or admin to delete comments if needed
  if (comment.author.toString() !== userId.toString()) {
    throw new ApiError(403, "User not authorized to delete this comment");
  }

  // Remove the comment document
  await Comment.findByIdAndDelete(commentId);

  // Remove the comment reference from the resource's comments array
  await Resource.findByIdAndUpdate(comment.resource, {
    $pull: { comments: commentId },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedId: commentId },
        "Comment deleted successfully",
      ),
    );
});

export {
  addCommentToResource,
  getResourceComments,
  updateComment,
  deleteComment,
};
