const express = require("express");
const { createTodo, viewTodoCreatedBy, viewAllTodos, deleteTodo } = require("../controllers/todoController");
const { verifyAccessToken } = require("../auth/validate");
const { checkRole } = require("../auth/checkRole");

const router = express.Router();

router.post("/add", verifyAccessToken, checkRole(["ROLE_USER", "ROLE_ADMIN"]), createTodo);
router.get("/me", verifyAccessToken, checkRole(["ROLE_USER"]), viewTodoCreatedBy);
router.get("/all", verifyAccessToken, checkRole(["ROLE_ADMIN"]), viewAllTodos);

router.delete("/delete/:todoId", verifyAccessToken, checkRole(["ROLE_USER", "ROLE_ADMIN"]), deleteTodo);

module.exports = router;
