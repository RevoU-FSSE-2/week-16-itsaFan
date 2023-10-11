const config = require("../config/config");
const jwt = require("jsonwebtoken");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      role: user.role.role
    },
    config.accessSecret,
    {
      expiresIn: "30s",
    }
  );

  const refreshToken = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      role: user.role.role
    },
    config.refreshSecret,
    {
      expiresIn: "7d",
    }
  );

  return { accessToken, refreshToken };
};

module.exports = generateTokens;
