const { permissionDao, userDao } = require("../dao");
const { isValidPassword } = require("../utils/password-validation");
const generateTokens = require("../auth/token-generator");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUsername = await userDao.findUsername(username);
    if (existingUsername) {
      return res.status(403).json({ message: "Username already taken" });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        message: "Password needs to be at least 8 characters long and contain both numerical and alphabetical letters.",
      });
    }

    const defaultRole = await permissionDao.findUserRole();
    if (!defaultRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    await userDao.createUser({ username, email, password, role: defaultRole._id });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    let user;

    if (!identifier || !password) {
      return res.status(400).json({ message: "Email/username & password is required" });
    }

    if (identifier.includes("@")) {
      user = await userDao.findEmail(identifier)
    } else {
      user = await userDao.findUsername(identifier)
    }

    if (!user) {
      return res.status(401).json({ message: "Username or Email not found" });
    }

    if (!user.verifyPassword(password)) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.json({ accessToken });

  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  register,
  login,
};

