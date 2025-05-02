import { Router } from "express";
import {
  updateComment,
  deleteComment,
  addCommentToResource,
  getResourceComments,
} from "../controllers/comment.controller.js";
import { fetchUserBySupabaseId } from "../controllers/resource.controller.js";

// Assume auth middleware exists and is imported
// import { verifyJWT } from "../middlewares/auth.middleware.js";
// Placeholder for verifyJWT (can share or import from a common place)
const verifyJWT = (req, res, next) => {
  // FIXME: Replace with actual JWT verification logic
  console.log("verifyJWT middleware called (placeholder) in comment routes");
  next();
};

const router = Router();

// Apply verifyJWT middleware to all comment modification routes
router.use(verifyJWT);

// Route for updating a specific comment
// PATCH /api/v1/comments/:commentId
// Route for adding a comment to a resource
// POST /api/v1/comments/:resourceId
router.route("/:resourceId").post(fetchUserBySupabaseId, addCommentToResource);
// Route for fetching comments of a specific resource
// GET /api/v1/comments/:resourceId
router.route("/:resourceId").get(getResourceComments);

router
  .route("/:commentId")
  .patch(verifyJWT, fetchUserBySupabaseId, updateComment)
  .delete(verifyJWT, fetchUserBySupabaseId, deleteComment);

export default router;
