const {
  httpCreateComment,
  httpGetComments,
  httpUpdateComment,
  httpDeleteComment,
} = require("./comments.controller");
const express = require("express");

const comments_router = express.Router();

comments_router.get("/:post_id", httpGetComments);
comments_router.post("/:post_id", httpCreateComment);
comments_router.put("/:comment_id", httpUpdateComment);
comments_router.delete("/:comment_id", httpDeleteComment);

module.exports = comments_router;
