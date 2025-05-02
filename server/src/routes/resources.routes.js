import { Router } from "express";
import {
  createResource,
  getAllResources,
  getResourceById,
  updateResourceById,
  deleteResourceById,
  upvoteResource,
  downvoteResource,
  fetchUserBySupabaseId,
} from "../controllers/resource.controller.js";
import {
  addCommentToResource,
  getResourceComments,
} from "../controllers/comment.controller.js";

// Assume auth middleware exists and is imported
// import { verifyJWT } from "../middlewares/auth.middleware.js";
// Placeholder for verifyJWT
const verifyJWT = (req, res, next) => {
  // FIXME: Replace with actual JWT verification logic
  // Example: Add a dummy user object for controller placeholders
  // req.user = { _id: "60f8f8f8f8f8f8f8f8f8f8f8" };
  console.log("verifyJWT middleware called (placeholder)");
  next();
};

const router = Router();

// --- Resource Routes ---
router
  .route("/create")
  .post(verifyJWT, fetchUserBySupabaseId, createResource) // POST /api/v1/resources
  .get(getAllResources); // GET /api/v1/resources

router
  .route("/:id")
  .get(getResourceById) // GET /api/v1/resources/:id
  .patch(verifyJWT, fetchUserBySupabaseId, updateResourceById) // PATCH /api/v1/resources/:id
  .delete(verifyJWT, fetchUserBySupabaseId, deleteResourceById); // DELETE /api/v1/resources/:id

// --- Voting Routes ---
router
  .route("/:id/vote/up")
  .post(verifyJWT, fetchUserBySupabaseId, upvoteResource); // POST /api/v1/resources/:id/vote/up
router
  .route("/:id/vote/down")
  .post(verifyJWT, fetchUserBySupabaseId, downvoteResource); // POST /api/v1/resources/:id/vote/down

// --- Comment Routes (for a specific resource) ---
router
  .route("/:resourceId/comments")
  .post(verifyJWT, fetchUserBySupabaseId, addCommentToResource) // POST /api/v1/resources/:resourceId/comments
  .get(getResourceComments); // GET /api/v1/resources/:resourceId/comments

export default router;
