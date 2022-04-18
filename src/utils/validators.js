// function isInvalidCreationDate(date) {
//   return isNaN(date);
// }

function isInvalidCommentFormat(comment) {
  return (
    !comment.post_id ||
    !comment.owner_id ||
    (!comment.content.description && !comment.content.media_locator)
  );
}

function isInvalidInnerComment(inner_comment) {
  return (
    !inner_comment.owner_id ||
    !inner_comment.comment_id ||
    (!inner_comment.content.description && !inner_comment.content.media_locator)
  );
}

function isInvalidCommentContent(content) {
  return !content.description && !content.media_locator;
}

module.exports = {
  isInvalidCommentFormat,
  isInvalidInnerComment,
  isInvalidCommentContent,
};
