const express = require("express");

const comments_router = require("../routes/comments/comments.router");
const inner_comments_router = require("../routes/inner-comments/inner_comments.router");
const api = express.Router();

api.use("/comments", comments_router);
api.use("/inner-comments", inner_comments_router);

module.exports = api;
