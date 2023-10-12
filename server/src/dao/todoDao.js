const Todo = require("../models/todo");

const createTodo = async (todoData) => {
  const newTodo = new Todo(todoData);
  await newTodo.save();
  return newTodo;
};

const getTodoByCreator = async (createdBy) => {
  return Todo.find({ createdBy }).populate("createdBy", "_id username email");
};

const getAllTodos = async () => {
  return Todo.find();
};

const getTodoByID = async (_id) => {
  return Todo.findById({ _id }).populate("createdBy", "_id username email");
};

const deleteTodo = async (todoId) => {
  return Todo.deleteOne({ _id: todoId });
};

module.exports = {
  createTodo,
  getTodoByCreator,
  getAllTodos,
  getTodoByID,
  deleteTodo,
};
