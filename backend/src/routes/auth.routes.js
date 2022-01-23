// packages
const express = require("express");
const createHttpError = require("http-errors");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
