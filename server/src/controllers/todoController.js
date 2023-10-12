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

const test = async (req, res) => {
  res.json({ message: "This is a protected resource." });
};

module.exports = {
  test,
  createTodo,
};
