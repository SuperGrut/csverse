import mongoose from "mongoose";
import Resource from "../models/resource.model.js";
import User from "../models/User.js"; // Assuming User model path and field name 'supabaseId'
import { fetchYouTubeVideoData } from "../utils/youtubeApi.js"; // Import the util function
// Assuming utility functions/classes exist
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";

// Placeholder for asyncHandler if not available
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Placeholder for ApiError if not available
export class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null; // Standardizing ApiError structure
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Placeholder for ApiResponse if not available
export class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

// Middleware to fetch user by Supabase ID from req.body
const fetchUserBySupabaseId = asyncHandler(async (req, _, next) => {
  const { supabaseUserId } = req.body;

  if (!supabaseUserId) {
    // Pass an error to the next middleware (error handler)
    return next(
      new ApiError(400, "supabaseUserId is required in the request body"),
    );
  }

  const user = await User.findOne({ supabaseUserId: supabaseUserId }); // Assuming 'supabaseId' field exists on User model

  if (!user) {
    // Pass an error to the next middleware (error handler)
    return next(
      new ApiError(404, "User not found with the provided supabaseUserId"),
    );
  }

  // Attach user's MongoDB _id to the request object
  req.user = { _id: user._id };
  next(); // Proceed to the next middleware or controller
});

// Helper function to extract YouTube Video ID
const extractYouTubeVideoId = (url) => {
  try {
    const urlObj = new URL(url);
    if (
      urlObj.hostname.includes("youtube.com") &&
      urlObj.searchParams.has("v")
    ) {
      return urlObj.searchParams.get("v");
    } else if (urlObj.hostname.includes("youtu.be")) {
      return urlObj.pathname.slice(1);
    }
  } catch (error) {
    console.error("Error parsing URL:", error);
  }
  return null;
};

const createResource = asyncHandler(async (req, res) => {
  // User ID is now expected to be attached by fetchUserBySupabaseId middleware
  const userId = req.user?._id;
  if (!userId) {
    // This should technically be caught by the middleware, but double-check
    throw new ApiError(401, "User not authenticated or found");
  }

  const { tags, type, url } = req.body;

  // Basic validation
  if (!tags || !type || !url) {
    throw new ApiError(400, "Missing required fields: tags, type, url");
  }
  if (!Array.isArray(tags) || tags.length === 0) {
    throw new ApiError(400, "Tags must be a non-empty array");
  }
  if (!["video", "playlist"].includes(type)) {
    throw new ApiError(400, "Invalid resource type specified");
  }

  let title = "";
  let description = "";
  let thumbnailURL = "";
  let publishedAt = null;
  let channelTitle = "";
  let resourceLanguage = "";
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (type === "video") {
    const videoId = extractYouTubeVideoId(url);
    if (videoId && apiKey) {
      const videoData = await fetchYouTubeVideoData(videoId, apiKey);
      if (videoData) {
        title = videoData.title;
        description = videoData.description;
        // Prefer higher resolution thumbnail if available
        thumbnailURL =
          videoData.thumbnails?.high?.url ||
          videoData.thumbnails?.default?.url ||
          "";
        publishedAt = videoData.publishedAt
          ? new Date(videoData.publishedAt)
          : null;
        channelTitle = videoData.channelTitle;
        resourceLanguage =
          videoData.defaultAudioLanguage || videoData.defaultLanguage || ""; // Get language if available
      } else {
        console.warn(
          `Could not fetch data for video ID: ${videoId}. Using defaults.`,
        );
        // Keep default values or handle error as needed
      }
    } else if (!videoId) {
      console.warn(`Could not extract video ID from URL: ${url}`);
      // Potentially throw an error or use default values
      throw new ApiError(400, "Invalid YouTube video URL provided");
    } else if (!apiKey) {
      console.error(
        "YouTube API Key (YOUTUBE_API_KEY) is not configured in environment variables.",
      );
      // Handle missing API key - maybe throw 500 or use defaults
      throw new ApiError(
        500,
        "Server configuration error: Missing YouTube API Key.",
      );
    }
  } else if (type === "playlist") {
    // For playlists, title and thumbnail might need manual input or a different API
    // For now, require them in the request body or set defaults
    title = req.body.title || "Playlist Resource"; // Example: require title for playlist
    thumbnailURL = req.body.thumbnailURL || ""; // Example: require thumbnail for playlist
    if (!req.body.title) {
      // Example validation
      throw new ApiError(400, "Title is required for playlist resources.");
    }
  }

  // Use extracted/provided title if available, otherwise throw error or default
  if (!title) {
    // This might happen if API call failed for video and no default is set
    throw new ApiError(400, "Resource title could not be determined.");
  }

  const resource = await Resource.create({
    title,
    description,
    tags,
    type,
    url,
    thumbnailURL,
    publishedAt,
    channelTitle,
    resourceLanguage,
    submittedBy: userId, // Use the authenticated user's ID
  });

  if (!resource) {
    throw new ApiError(500, "Failed to create the resource");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, resource, "Resource created successfully"));
});

const getAllResources = asyncHandler(async (req, res) => {
  // TODO: Add pagination, filtering, sorting options via query parameters
  const resources = await Resource.find()
    .populate("submittedBy", "username email") // Example: Populate submitter info
    .sort({ createdAt: -1 }); // Sort by newest first

  return res
    .status(200)
    .json(new ApiResponse(200, resources, "Resources fetched successfully"));
});

const getResourceById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid resource ID format");
  }

  const resource = await Resource.findById(id)
    .populate("submittedBy", "username email")
    .populate("comments"); // Optionally populate comments

  if (!resource) {
    throw new ApiError(404, "Resource not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, resource, "Resource fetched successfully"));
});

//FIXME: Apply extracttDataFromYoututbe utility function here
const updateResourceById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id; // Get user ID from middleware

  if (!userId) {
    throw new ApiError(401, "User not authenticated or found");
  }

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid resource ID format");
  }

  // Find the resource first to check ownership
  const resourceToUpdate = await Resource.findById(id);

  if (!resourceToUpdate) {
    throw new ApiError(404, "Resource not found");
  }

  // Authorization check: Ensure the user owns the resource
  // Note: Convert both IDs to strings for reliable comparison
  if (resourceToUpdate.submittedBy.toString() !== userId.toString()) {
    throw new ApiError(403, "User not authorized to update this resource");
  }

  // Proceed with update logic...
  const { tags, type, url } = req.body;
  const updateData = {};
  if (title) updateData.title = title;
  if (tags) {
    if (!Array.isArray(tags) || tags.length === 0) {
      throw new ApiError(400, "Tags must be a non-empty array");
    }
    updateData.tags = tags;
  }
  if (type) {
    if (!["video", "playlist"].includes(type)) {
      throw new ApiError(400, "Invalid resource type specified");
    }
    updateData.type = type;
  }
  if (url) updateData.url = url;
  if (thumbnailURL) updateData.thumbnailURL = thumbnailURL;

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, "No fields provided for update");
  }

  const resource = await Resource.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true },
  );

  // No need to check for resource again here as findByIdAndUpdate would return null if not found
  // But we already checked ownership above. The findByIdAndUpdate implicitly handles the "found" part.

  return res
    .status(200)
    .json(new ApiResponse(200, resource, "Resource updated successfully"));
});

const deleteResourceById = asyncHandler(async (req, res) => {
  const { id } = req.params; // Resource id
  const userId = req.user?._id; // Get user ID from middleware

  if (!userId) {
    throw new ApiError(401, "User not authenticated or found");
  }

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid resource ID format");
  }

  // Find the resource first to check ownership
  const resourceToDelete = await Resource.findById(id);

  if (!resourceToDelete) {
    throw new ApiError(404, "Resource not found");
  }

  // Authorization check: Ensure the user owns the resource
  if (resourceToDelete.submittedBy.toString() !== userId.toString()) {
    throw new ApiError(403, "User not authorized to delete this resource");
  }

  // Proceed with deletion
  const deletedResource = await Resource.findByIdAndDelete(id);

  // Check if deletion was successful (though ownership check should prevent unauthorized attempts)
  if (!deletedResource) {
    // This might indicate a race condition or other issue if the resource disappeared
    // between the findById and findByIdAndDelete calls.
    throw new ApiError(
      500,
      "Failed to delete the resource after authorization",
    );
  }

  // Optional: Delete associated comments, etc. if needed
  // await Comment.deleteMany({ resource: id });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { deletedId: id }, "Resource deleted successfully"),
    );
});

// --- Vote Controllers ---

const upvoteResource = asyncHandler(async (req, res) => {
  const { id } = req.params; //Resource id
  const userId = req.user?._id; // Get user ID from middleware

  if (!userId) {
    throw new ApiError(401, "User must be logged in to vote");
  }

  // TODO: Implement logic to prevent multiple upvotes from the same user (userId).
  // This usually requires checking if the userId is already in an 'upvotedBy' array
  // or querying a separate Vote collection.

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid resource ID format");
  }

  // Find the resource to ensure it exists before trying to update
  const resourceToUpdate = await Resource.findById(id);
  if (!resourceToUpdate) {
    throw new ApiError(404, "Resource not found");
  }

  // For now, just increment the count. Real implementation needs vote tracking.
  const resource = await Resource.findByIdAndUpdate(
    id,
    { $inc: { upvotes: 1 } },
    { new: true },
  );

  // No need for !resource check here if findById ensures it exists

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { upvotes: resource.upvotes, downvotes: resource.downvotes },
        "Resource upvoted successfully",
      ),
    );
});

const downvoteResource = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id; // Get user ID from middleware

  if (!userId) {
    throw new ApiError(401, "User must be logged in to vote");
  }

  // TODO: Implement logic to prevent multiple downvotes from the same user (userId).

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid resource ID format");
  }

  // Find the resource to ensure it exists
  const resourceToUpdate = await Resource.findById(id);
  if (!resourceToUpdate) {
    throw new ApiError(404, "Resource not found");
  }

  // For now, just increment the count. Real implementation needs vote tracking.
  const resource = await Resource.findByIdAndUpdate(
    id,
    { $inc: { downvotes: 1 } },
    { new: true },
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { upvotes: resource.upvotes, downvotes: resource.downvotes },
        "Resource downvoted successfully",
      ),
    );
});

export {
  fetchUserBySupabaseId, // Export the new middleware
  createResource,
  getAllResources,
  getResourceById,
  updateResourceById,
  deleteResourceById,
  upvoteResource, // Export new vote controller
  downvoteResource, // Export new vote controller
};
