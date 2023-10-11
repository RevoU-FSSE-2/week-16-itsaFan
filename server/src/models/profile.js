const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
