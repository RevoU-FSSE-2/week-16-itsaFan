const express = require("express");
const config = require("./config/config");
const cookieParser = require("cookie-parser");
const { applyCors } = require("./middlewares");
const dbConnection = require("./config/db-config");
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

//setup
const app = express();
applyCors(app);
app.use(cookieParser());
app.use(express.json());
dbConnection();


app.use('/api', authRoutes)
app.use('/api/user', userRoutes)

//Dummy
// const users = [{ id: 1, username: "fan", password: "zxc12345" }];

// app.get("/protected", verifyAccessToken, (req, res) => {
//   res.json({ message: "This is a protected resource." });
// });


// app.post("/refresh", (req, res) => {
//   const refreshToken = req.cookies.refreshToken;

//   if (!refreshToken) {
//     return res.status(401).json({ error: "No refresh token provided." });
//   }

//   jwt.verify(refreshToken, REFRESH_SECRET, (error, userPayload) => {
//     if (error) {
//       return res.status(401).json({ error: "Invalid refresh token." });
//     }

//     const newAccessToken = jwt.sign({ userId: userPayload.userId, username: userPayload.username }, ACCESS_SECRET, {
//       expiresIn: "30s",
//     });

//     res.json({ accessToken: newAccessToken });
//   });
// });

app.listen(config.port, () => console.log(`Server is running on http://localhost:${config.port}`));
