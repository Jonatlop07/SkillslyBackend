const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;
const MONGO_TESTS_URL = process.env.MONGO_TESTS_URL;

mongoose.connection.once("open", () => {
  console.log("Connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoConnectTests() {
  await mongoose.connect(MONGO_TESTS_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
  mongoConnectTests,
};
