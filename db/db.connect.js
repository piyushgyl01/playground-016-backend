const mongoose = require("mongoose");

require("dotenv").config();

const MONGOURI = process.env.MONGODB;

const connectToDatabase = async () => {
  await mongoose
    .connect(MONGOURI)
    .then(() => {
      console.log("CONNECTED TO THE DATABASE");
    })
    .catch((error) =>
      console.error("UNABLE TO CONNECT TO THE DATABASE", error)
    );
};

module.exports = { connectToDatabase };
