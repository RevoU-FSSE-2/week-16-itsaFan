const express = require("express");
const { test, createTodo } = require("../controllers/todoController");
const { verifyAccessToken } = require("../auth/validate");
const { checkRole } = require("../auth/checkRole");

const router = express.Router();

router.get("/protected", verifyAccessToken, test);
router.post("/add", verifyAccessToken, checkRole(["ROLE_USER", "ROLE_ADMIN"]), createTodo);

module.exports = router;
