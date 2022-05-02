const {
  httpCreateInnerComment,
  httpDeleteInnerComment,
  httpGetInnerComments,
  httpUpdateInnerComment,
  httpDeleteAllInnerComments,
} = require("./inner_comments.controller");
const express = require("express");

const inner_comments_router = express.Router();

inner_comments_router.get("/:comment_id", httpGetInnerComments);
inner_comments_router.post("/:comment_id", httpCreateInnerComment);
inner_comments_router.put("/:inner_comment_id", httpUpdateInnerComment);
inner_comments_router.delete("/:inner_comment_id", httpDeleteInnerComment);
inner_comments_router.delete("/user/:owner_id", httpDeleteAllInnerComments);

module.exports = inner_comments_router;
