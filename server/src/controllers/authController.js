const { profileDao, permissionDao, userDao } = require("../dao");
const { isValidPassword } = require("../utils/password-validation");

const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingUsername = await profileDao.findUsername(username);
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

    await userDao.createUser({ email, password, role: defaultRole._id });
    await profileDao.createProfile({ username });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

module.exports = {
  register,
};
