import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { app } from "../app.js";
import User from "../models/User.js";

// Mock the User model
vi.mock("../models/User.js", () => ({
  default: {
    findOneAndUpdate: vi.fn(),
  },
}));

describe("POST /sync-user", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

    const res = await request(app).post("/api/v1/users/sync-user").send({
      supabaseUserId: "123",
      username: "john",
      avatarUrl: "http://avatar.com/john.png",
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User profile synced successfully.");
    expect(res.body.user).toEqual(mockUser);
    expect(User.findOneAndUpdate).toHaveBeenCalledWith(
      { supabaseUserId: "123" },
      { $set: { username: "john", avatarUrl: "http://avatar.com/john.png" } },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );
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
