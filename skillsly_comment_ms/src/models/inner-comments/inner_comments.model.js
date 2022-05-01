const { updateInnerCommentCount } = require("../comments/comments.model.js");
const inner_comments = require("../inner-comments/inner_comments.mongo");
const {
  isInvalidCommentContent,
  isInvalidInnerComment,
} = require("../../utils/validators");
const { customException } = require("../../utils/exception");

const mongoose = require("mongoose");

async function getInnerComments(comment_id, skip, limit) {
  return await inner_comments
    .find(
      {
        comment_id: comment_id,
      },
      "-__v"
    )
    .sort({ created_at: -1 })
    .skip(skip)
    .limit(limit);
}

async function createInnerComment(inner_comment) {
  if (isInvalidInnerComment(inner_comment)) {
    throw customException(
      "Invalid inner comment format",
      "INVALID_INNER_COMMENT_FORMAT"
    );
  }

  const new_inner_comment = {
    owner_id: inner_comment.owner_id,
    comment_id: mongoose.Types.ObjectId(inner_comment.comment_id),
    content: {
      description: inner_comment.content.description,
      media_locator: inner_comment.content.media_locator,
    },
    created_at: new Date(),
  };

  const updated = await updateInnerCommentCount(inner_comment.comment_id, 1);
  if (!updated) {
    throw customException(
      "Could not update inner comment count on parent comment",
      "COMMENT_NOT_FOUND"
    );
  }
  const created_inner_comment = await inner_comments.create(new_inner_comment);
  return created_inner_comment;
}

async function updateInnerComment(inner_comment) {
  const { inner_comment_id, description, media_locator } = inner_comment;
  if (isInvalidCommentContent({ description, media_locator })) {
    throw customException(
      "Invalid inner comment content",
      "INVALID_COMMENT_CONTENT"
    );
  }
  const updated = await inner_comments.findByIdAndUpdate(inner_comment_id, {
    content: {
      description,
      media_locator,
    },
    updated_at: new Date(),
  });
  if (!updated) {
    await inner_comments.findByIdAndDelete(inner_comment_id);
    throw customException(
      "Could not update inner comment",
      "INNER_COMMENT_NOT_FOUND"
    );
  }
}

async function deleteInnerComment(inner_comment_id) {
  const deleted = await inner_comments.findByIdAndDelete(inner_comment_id);
  if (!deleted) {
    throw customException(
      "Could not delete inner comment",
      "INNER_COMMENT_NOT_FOUND"
    );
  }
  const updated = await updateInnerCommentCount(
    deleted.comment_id.toString(),
    0
  );
  if (!updated) {
    throw customException(
      "Could not update inner comment count on parent comment",
      "COMMENT_NOT_FOUND"
    );
  }
}

async function deleteAllOwnerInnerComments(owner_id) {
  const owner_comments = await inner_comments.find(
    { owner_id },
    "-__v -post_id -content -created_at -owner_id -inner_comment_count"
  );
  owner_comments.forEach(async (inner_comment) => {
    await deleteInnerComment(inner_comment._id);
  });
}

module.exports = {
  getInnerComments,
  createInnerComment,
  updateInnerComment,
  deleteInnerComment,
  deleteAllOwnerInnerComments,
};
