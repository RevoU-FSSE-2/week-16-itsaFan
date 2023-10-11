const express = require("express");
const config = require("./config/config");
const cookieParser = require("cookie-parser");
const { applyCors } = require("./middlewares");
const { verifyAccessToken } = require("./auth/validate");
const dbConnection = require("./config/db-config");
const authRoutes = require('./routes/authRoutes')

//setup
const app = express();
applyCors(app);
app.use(cookieParser());
app.use(express.json());
dbConnection();


app.use('/api', authRoutes)

//Dummy
const users = [{ id: 1, username: "fan", password: "zxc12345" }];

app.get("/protected", verifyAccessToken, (req, res) => {
  res.json({ message: "This is a protected resource." });
});

app.listen(config.port, () => console.log(`Server is running on http://localhost:${config.port}`));
