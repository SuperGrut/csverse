import mongoose from "mongoose";
import * as resourceController from "./resource.controller.js";
import Resource from "../models/resource.model.js";
import User from "../models/User.js";
import { ApiResponse } from "./resource.controller.js";

jest.mock("../models/resource.model.js");
jest.mock("../models/User.js");

// Mock fetchYouTubeVideoData
jest.mock("../utils/youtubeApi.js", () => ({
  fetchYouTubeVideoData: jest.fn().mockResolvedValue({
    title: "Test Video",
    description: "desc",
    thumbnails: { high: { url: "thumb" }, default: { url: "thumb" } },
    publishedAt: "2020-01-01T00:00:00Z",
    channelTitle: "Channel",
    defaultAudioLanguage: "en",
  }),
}));

describe("resource.controller", () => {
  let req, res, next;
  beforeEach(() => {
    req = { body: {}, params: {}, user: { _id: "userId" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("createResource", () => {
    it("should return 400 if required fields are missing", async () => {
      req.body = { type: "video", url: "http://youtube.com" }; // missing tags
      await resourceController.createResource(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });

    it("should create a video resource and return 201", async () => {
      req.body = {
        tags: ["tag"],
        type: "video",
        url: "https://www.youtube.com/watch?v=abc123",
      };
      process.env.YOUTUBE_API_KEY = "fake";
      Resource.create.mockResolvedValue({ _id: "1", title: "Test Video" });
      Resource.countDocuments.mockResolvedValue(1);
      User.findByIdAndUpdate.mockResolvedValue({});
      await resourceController.createResource(req, res, next);
      expect(Resource.create).toHaveBeenCalledWith(
        expect.objectContaining({ title: "Test Video" }),
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.any(ApiResponse));
    });
  });

  describe("getAllResources", () => {
    it("should return all resources", async () => {
      const resources = [{ _id: "1", title: "Test" }];
      Resource.find.mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(resources),
      });
      await resourceController.getAllResources(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.any(ApiResponse));
    });
  });
});
