const express = require("express");
const { register, login } = require("../controllers/authController");
const { LoginLimiter } = require("../middlewares");

const router = express.Router();

router.post("/register", register);
router.post("/login", LoginLimiter, login);

module.exports = router;
