const express = require("express");
const config = require("./config/config");
const cookieParser = require("cookie-parser");
const { applyCors } = require("./middlewares");
const generateTokens = require("./auth/token-generator");
const { verifyAccessToken } = require("./auth/validate");

// Middlewares setup
const app = express();
applyCors(app);
app.use(cookieParser());
app.use(express.json());

//Dummy
const users = [{ id: 1, username: "fan", password: "zxc12345" }];

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const { accessToken, refreshToken } = generateTokens(user);
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.json({ accessToken });
});

app.get("/protected", verifyAccessToken, (req, res) => {
    res.json({ message: "This is a protected resource." });
  });

app.listen(config.port, () => console.log(`Server is running on http://localhost:${config.port}`));
