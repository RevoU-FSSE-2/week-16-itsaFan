const express = require("express");
const { test } = require("../controllers/userController");
const { verifyAccessToken } = require("../auth/validate");

const router = express.Router();

router.get("/protected", verifyAccessToken, test);

module.exports = router;
