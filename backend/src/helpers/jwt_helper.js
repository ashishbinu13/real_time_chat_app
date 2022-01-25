const JWT = require("jsonwebtoken");
const createHttpError = require("http-errors");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "chat-app",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createHttpError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"])
      return next(createHttpError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (token === "null") return next(createHttpError.Unauthorized());

    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        // if (err.name === "JasonWebTokenError")
        //   return next(createHttpError.Unauthorized());
        // else return next(createHttpError.Unauthorized(err.message));

        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;

        return next(createHttpError.Unauthorized(message));
      }

      req.payload = payload;
      next();
    });
  },
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "ICTAK",
        audience: userId,
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createHttpError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) throw createHttpError.Unauthorized();

          const userId = payload.aud;
          resolve(userId);
        }
      );
    });
  },
};
