const {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
  deleteAllOwnerComments,
} = require("../../models/comments/comments.model");
const getPagination = require("../../utils/pagination");
const { getException } = require("../../utils/exception");

async function httpGetComments(req, res) {
  const { skip, limit } = getPagination(req.query);
  try {
    const comments = await getAllComments(req.params.post_id, skip, limit);
    return res.status(200).json({ comments });
  } catch (e) {
    getException(res, e);
  }
}

async function httpCreateComment(req, res) {
  const new_comment = req.body;
  try {
    const { _id, content, created_at, owner_id } = await createComment({
      ...new_comment,
      post_id: req.params.post_id,
    });
    return res.status(201).json({ _id, content, created_at, owner_id });
  } catch (e) {
    getException(res, e);
  }
}

async function httpUpdateComment(req, res) {
  const updated_content = req.body;
  try {
    await updateComment({
      ...updated_content,
      comment_id: req.params.comment_id,
    });
    return res.status(200).json(updated_content);
  } catch (e) {
    getException(res, e);
  }
}

async function httpDeleteComment(req, res) {
  const comment_id = req.params.comment_id;
  try {
    await deleteComment(comment_id);
    return res.status(200).json({ deleted_comment: comment_id });
  } catch (e) {
    getException(res, e);
  }
}

async function httpDeleteAllComments(req, res) {
  const owner_id = req.params.owner_id;
  try {
    await deleteAllOwnerComments(owner_id);
    return res.status(200).json({ deleted_owner: owner_id });
  } catch (e) {
    getException(res, e);
  }
}

module.exports = {
  httpCreateComment,
  httpGetComments,
  httpUpdateComment,
  httpDeleteComment,
  httpDeleteAllComments,
};
