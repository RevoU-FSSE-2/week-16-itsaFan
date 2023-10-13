const rateLimit = require("express-rate-limit");

const LoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Too many login attempts, please try again after 15 minutes",
});

module.exports = {
  LoginLimiter,
};
