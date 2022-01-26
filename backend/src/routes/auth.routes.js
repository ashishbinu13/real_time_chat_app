// packages
const express = require("express");
const createHttpError = require("http-errors");

// modules
const User = require("../models/users.models");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
} = require("../helpers/jwt_helper");
const { signupSchema, loginSchema } = require("../helpers/validation_schema");

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  try {
    const result = await signupSchema.validateAsync(req.body);
    const usernameExists = await User.findOne({ username: result.username });
    if (usernameExists)
      throw createHttpError.Conflict(
        `${result.username} is already taken. Please use another username.`
      );

    const emailExists = await User.findOne({ email: result.email });
    if (emailExists)
      throw createHttpError.Conflict(`${result.email} is already registered.`);
    const user = new User(result);
    const savedUser = await user.save();
    const accessToken = await signAccessToken(savedUser.username);
    const refreshToken = await signRefreshToken(savedUser.username);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync(req.body);
    const user = await User.findOne({ username: result.username });
    if (!user) throw createHttpError.NotFound("User is not registered");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch)
      throw createHttpError.Unauthorized("Invalid username/password");

    const accessToken = await signAccessToken(user.username);
    const refreshToken = await signRefreshToken(user.username);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
