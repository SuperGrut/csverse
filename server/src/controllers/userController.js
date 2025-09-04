import User from "../models/User.js";
import { ApiError, ApiResponse, asyncHandler } from "./resource.controller.js";

// Controller to sync user profile (create or update)
const syncUser = async (req, res) => {
  const { supabaseUserId, username, avatarUrl } = req.body;

  if (!supabaseUserId || !username) {
    return res.status(400).json({
      message: "Missing required fields: supabaseUserId and username",
    });
  }

  try {
    const options = {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    };

    const updatedUser = await User.findOneAndUpdate(
      { supabaseUserId },
      { $set: { username, avatarUrl } },
      options,
    );

    let message = "User profile synced successfully.";

    console.log(
      `User synced: ${updatedUser.username} (ID: ${updatedUser.supabaseUserId})`,
    );
    res.status(200).json({ message, user: updatedUser });
  } catch (error) {
    console.error("Error syncing user:", error);
    // Handle potential duplicate key error more gracefully if needed,
    // though upsert should generally handle it.
    if (error.code === 11000) {
      // MongoDB duplicate key error
      return res.status(409).json({
        message: "Conflict: User likely already exists with this Supabase ID.",
      });
    }
    res
      .status(500)
      .json({ message: "Internal server error during user sync." });
  }
};

/**
 * @description Get the leaderboard of users sorted by score
 * @route GET /api/v1/users/leaderboard
 * @access Public
 */
const getLeaderboard = asyncHandler(async (req, res) => {
  // Find users, select necessary fields, sort by score descending, limit to top 100 (or adjust as needed)
  const leaderboard = await User.find({})
    .select("username avatarUrl score") // Select only username, avatarUrl, and score
    .sort({ score: -1 }) // Sort by score in descending order
    .limit(100); // Optionally limit the number of results

  if (!leaderboard) {
    throw new ApiError(404, "Leaderboard data not found.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, leaderboard, "Leaderboard fetched successfully"),
    );
});

export { syncUser, getLeaderboard };
