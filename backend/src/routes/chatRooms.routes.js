// packages
const express = require("express");
const createHttpError = require("http-errors");

// modules
const { verifyAccessToken } = require("../helpers/jwt_helper");
const ChatRooms = require("../models/chatRooms.models");
const { roomSchema } = require("../helpers/validation_schema");

const router = express.Router();

router.get("/getRooms", verifyAccessToken, async (req, res, next) => {
  try {
    const rooms = await ChatRooms.find({ createdBy: req.payload.aud });
    res.send(rooms);
  } catch (error) {
    next(error);
  }
});

router.post("/createRoom", verifyAccessToken, async (req, res, next) => {
  try {
    const result = await roomSchema.validateAsync(req.body);
    const newRoom = new ChatRooms(result);
    const savedRoom = newRoom.save();
    res.json(newRoom);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
