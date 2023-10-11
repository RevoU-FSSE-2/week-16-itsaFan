const Profile = require("../models/profile");


const createProfile = async (data) => {
  const newProfile = new Profile(data);
  await newProfile.save();
  return newProfile;
};

const findUsername = async (username) => {
  return Profile.findOne({ username });
};

module.exports = {
  createProfile,
  findUsername,
};
