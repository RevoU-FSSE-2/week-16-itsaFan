const { todoDao } = require("../dao");

const createTodo = async (req, res) => {
  const { title, description } = req.body;

  const userId = req.userPayload.userId;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const todo = await todoDao.createTodo({
      title,
      description,
      createdBy: userId,
    });

    res.status(201).json({ message: "Todo created successfully", todo: todo });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const viewTodoCreatedBy = async (req, res) => {
  const userId = req.userPayload.userId;

  try {
    const todos = await todoDao.getTodoByCreator(userId);
    return res.status(200).json({ message: "Todo List: ", todos });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const viewAllTodos = async (req, res) => {
  try {
    const todos = await todoDao.getAllTodos();
    return res.status(200).json({ message: "All Todos: ", todos });
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  createTodo,
  viewTodoCreatedBy,
  viewAllTodos,
};
