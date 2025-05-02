import express from "express";
import { syncUser } from "../controllers/userController.js";

const router = express.Router();

// Route for syncing user profile (create or update)
// POST /api/users
router.post("/sync-user", syncUser);

// You can add other user-related routes here later (e.g., get user profile)
// router.get('/users/:id', getUserProfile);

export default router;
