const express = require("express");
const morgan = require("morgan");
const app = express();
const api = require("./routes/api");

app.use(express.json());
app.use(morgan("combined"));

app.use("/v1", api);

module.exports = app;
