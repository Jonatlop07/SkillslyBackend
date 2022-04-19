const {
  isInvalidCommentFormat,
  isInvalidCommentContent,
} = require("../../utils/validators");
const { customException } = require("../../utils/exception");
const comments = require("./comments.mongo");

async function getAllComments(post_id, skip, limit) {
  return await comments
    .find({ post_id }, "-__v")
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit);
}

async function createComment(comment) {
  if (isInvalidCommentFormat(comment)) {
    throw customException("Invalid comment format", "INVALID_COMMENT_FORMAT");
  }
  const new_comment = {
    owner_id: comment.owner_id,
    post_id: comment.post_id,
    content: {
      description: comment.content.description,
      media_locator: comment.content.media_locator,
    },
    created_at: new Date(),
  };

  return await comments.create(new_comment);
}

async function updateComment(comment) {
  const { description, media_locator, comment_id } = comment;
  if (isInvalidCommentContent({ description, media_locator })) {
    throw customException("Invalid comment content", "INVALID_COMMENT_CONTENT");
  }

  const updated = await comments.findByIdAndUpdate(comment_id, {
    content: {
      description,
      media_locator,
    },
    updated_at: new Date(),
  });
  if (!updated) {
    throw customException("Could not update comment", "COMMENT_NOT_FOUND");
  }
}

async function deleteComment(comment_id) {
  const deleted = await comments.findByIdAndDelete(comment_id);
  if (!deleted) {
    throw customException(
      "Could not delete inner comment",
      "COMMENT_NOT_FOUND"
    );
  }
}

async function updateInnerCommentCount(comment_id, increment) {
  return await comments.findByIdAndUpdate(comment_id, {
    $inc: { inner_comment_count: increment === 1 ? 1 : -1 },
  });
}

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  updateInnerCommentCount,
};
