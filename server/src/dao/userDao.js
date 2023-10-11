const User = require("../models/user");

const createUser = async (userData) => {
  const newUser = new User(userData);
  await newUser.save();
  return newUser;
};

const findUsername = async (username) => {
  return User.findOne({ username })
  .populate('role');
};

const findEmail = async (email) => {
  return User.findOne({ email })
  .populate('role');
};

module.exports = {
  createUser,
  findUsername,
  findEmail,
};
