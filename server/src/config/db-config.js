const mongoose = require("mongoose");
const config = require('./config')

const dbConnection = () => {
  mongoose
    .connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connect to MongoDb");
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = dbConnection;
