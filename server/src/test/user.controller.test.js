import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";

import { syncUser, getLeaderboard } from "../controllers/userController.js";
import { app } from "../app.js";
import User from "../models/User.js";

// Mock User model
vi.mock("../models/User.js", () => ({
  default: {
    findOneAndUpdate: vi.fn(),
    find: vi.fn(),
  },
}));

app.post("/sync", syncUser);
app.get("/api/v1/users/leaderboard", getLeaderboard);

describe("User Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // =======================
  // Tests for syncUser
  // =======================
  describe("POST /api/v1/users/sync", () => {
    it("should return 400 if required fields are missing", async () => {
      const res = await request(app).post("/api/v1/users/sync-user").send({
        username: "john",
        // missing supabaseUserId
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        "Missing required fields: supabaseUserId and username",
      );
    });

    it("should upsert and return user if valid", async () => {
      const mockUser = {
        supabaseUserId: "123",
        username: "john",
        avatarUrl: "http://avatar.com/john.png",
      };

      User.findOneAndUpdate.mockResolvedValue(mockUser);

      vi.spyOn(User, "findOneAndUpdate");

      const res = await request(app).post("/api/v1/users/sync-user").send({
        supabaseUserId: "123",
        username: "john",
        avatarUrl: "http://avatar.com/john.png",
      });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("User profile synced successfully.");
      expect(User.findOneAndUpdate).toHaveBeenCalledWith(
        { supabaseUserId: "123" },
        {
          $set: { username: "john", avatarUrl: "http://avatar.com/john.png" },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      );
      expect(res.body.user).toEqual(mockUser);
    });

    it("should handle duplicate key error", async () => {
      User.findOneAndUpdate.mockRejectedValue({ code: 11000 });

      const res = await request(app).post("/api/v1/users/sync-user").send({
        supabaseUserId: "123",
        username: "john",
      });

      expect(res.status).toBe(409);
      expect(res.body.message).toBe(
        "Conflict: User likely already exists with this Supabase ID.",
      );
    });

    it("should handle generic errors", async () => {
      User.findOneAndUpdate.mockRejectedValue(new Error("DB down"));

      const res = await request(app).post("/api/v1/users/sync-user").send({
        supabaseUserId: "123",
        username: "john",
      });

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Internal server error during user sync.");
    });
  });

  // =======================
  // Tests for getLeaderboard
  // =======================
  describe("GET /api/v1/users/leaderboard", () => {
    it("should return leaderboard successfully", async () => {
      const mockLeaderboard = [
        { username: "alice", avatarUrl: "a.png", score: 200 },
        { username: "bob", avatarUrl: "b.png", score: 150 },
      ];

      const mockSelect = vi.fn().mockReturnThis();
      const mockSort = vi.fn().mockReturnThis();
      const mockLimit = vi.fn().mockResolvedValue(mockLeaderboard);

      User.find.mockReturnValue({
        select: mockSelect,
        sort: mockSort,
        limit: mockLimit,
      });

      const res = await request(app).get("/api/v1/users/leaderboard");

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(mockLeaderboard);
      expect(res.body.message).toBe("Leaderboard fetched successfully");
    });

    it("should return 404 if leaderboard not found", async () => {
      const mockSelect = vi.fn().mockReturnThis();
      const mockSort = vi.fn().mockReturnThis();
      const mockLimit = vi.fn().mockResolvedValue(null);

      User.find.mockReturnValue({
        select: mockSelect,
        sort: mockSort,
        limit: mockLimit,
      });

      const res = await request(app).get("/api/v1/users/leaderboard");

      expect(res.status).toBe(404);
      expect(res.body.message).toBe("Leaderboard data not found.");
    });

    it("should handle unexpected errors", async () => {
      const mockSelect = vi.fn().mockReturnThis();
      const mockSort = vi.fn().mockReturnThis();
      const mockLimit = vi.fn().mockRejectedValue(new Error("DB crash"));

      User.find.mockReturnValue({
        select: mockSelect,
        sort: mockSort,
        limit: mockLimit,
      });

      const res = await request(app).get("/api/v1/users/leaderboard");

      expect(res.status).toBe(500);
      expect(res.body.message).toBe("Internal Server Error");
    });
  });
});
