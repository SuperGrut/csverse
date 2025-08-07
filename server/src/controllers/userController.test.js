import mongoose from "mongoose";
import { syncUser, getLeaderboard } from "./userController.js";
import User from "../models/User.js";

jest.mock("../models/User.js");

describe("userController", () => {
  let req, res;   

  //Setup and Teardown
  //Hook
  beforeEach(() => {
    req = { body: {}, params: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe("syncUser", () => {
    it("should return 400 if required fields are missing", async () => {
      req.body = { username: "testuser" }; // missing supabaseUserId
      await syncUser(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining("Missing required fields"),
      });
    });

    it("should upsert user and return 200", async () => {
      req.body = {
        supabaseUserId: "abc123",
        username: "testuser",
        avatarUrl: "url",
      };
      const fakeUser = { username: "testuser", supabaseUserId: "abc123" };
      User.findOneAndUpdate.mockResolvedValue(fakeUser);
      await syncUser(req, res);
      expect(User.findOneAndUpdate).toHaveBeenCalledWith(
        { supabaseUserId: "abc123" },
        { $set: { username: "testuser", avatarUrl: "url" } },
        expect.any(Object),
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.any(String),
        user: fakeUser,
      });
    });

    it("should handle duplicate key error", async () => {
      req.body = { supabaseUserId: "abc123", username: "testuser" };
      const error = { code: 11000 };
      User.findOneAndUpdate.mockRejectedValue(error);
      await syncUser(req, res);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining("Conflict"),
      });
    });

    it("should handle generic error", async () => {
      req.body = { supabaseUserId: "abc123", username: "testuser" };
      const error = { code: 123, message: "fail" };
      User.findOneAndUpdate.mockRejectedValue(error);
      await syncUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: expect.stringContaining("Internal server error"),
      });
    });
  });

  describe("getLeaderboard", () => {
    it("should return leaderboard data", async () => {
      const leaderboard = [
        { username: "a", avatarUrl: "url", score: 10 },
        { username: "b", avatarUrl: "url", score: 5 },
      ];
      User.find.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(leaderboard),
      });
      // getLeaderboard is wrapped in asyncHandler, so we need to call the returned function
      await getLeaderboard(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ data: leaderboard }),
      );
    });
  });
});
