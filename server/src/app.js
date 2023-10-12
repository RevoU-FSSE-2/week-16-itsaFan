const express = require("express");
const config = require("./config/config");
const cookieParser = require("cookie-parser");
const { applyCors } = require("./middlewares");
const dbConnection = require("./config/db-config");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/todoRoutes");

//setup
const app = express();
applyCors(app);
app.use(cookieParser());
app.use(express.json());
dbConnection();

app.use("/api", authRoutes);
app.use("/api/todo", userRoutes);


app.listen(config.port, () => console.log(`Server is running on http://localhost:${config.port}`));
