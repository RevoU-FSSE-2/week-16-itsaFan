const Todo = require("../models/todo");

const createTodo = async (todoData) => {
  const newTodo = new Todo(todoData);
  await newTodo.save();
  return newTodo;
};

module.exports = {
  createTodo,
};
