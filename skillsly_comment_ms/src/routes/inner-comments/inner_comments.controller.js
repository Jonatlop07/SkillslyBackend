const {
  getInnerComments,
  createInnerComment,
  updateInnerComment,
  deleteInnerComment,
  deleteAllOwnerInnerComments,
} = require("../../models/inner-comments/inner_comments.model");
const getPagination = require("../../utils/pagination");
const { getException } = require("../../utils/exception");

async function httpGetInnerComments(req, res) {
  const { skip, limit } = getPagination(req.query);
  try {
    const inner_comments = await getInnerComments(
      req.params.comment_id,
      skip,
      limit
    );
    return res.status(200).json({ inner_comments });
  } catch (e) {
    getException(res, e);
  }
}

async function httpCreateInnerComment(req, res) {
  const inner_comment = req.body;
  try {
    const { _id, content, owner_id, created_at } = await createInnerComment({
      ...inner_comment,
      comment_id: req.params.comment_id,
    });
    return res.status(201).json({ _id, content, owner_id, created_at });
  } catch (e) {
    getException(res, e);
  }
}

async function httpUpdateInnerComment(req, res) {
  const updated_content = req.body;
  try {
    await updateInnerComment({
      ...updated_content,
      inner_comment_id: req.params.inner_comment_id,
    });
    return res.status(200).json(updated_content);
  } catch (e) {
    getException(res, e);
  }
}

async function httpDeleteInnerComment(req, res) {
  const inner_comment_id = req.params.inner_comment_id;
  try {
    await deleteInnerComment(inner_comment_id);
    return res.status(200).json({ deleted_comment: inner_comment_id });
  } catch (e) {
    getException(res, e);
  }
}

async function httpDeleteAllInnerComments(req, res) {
  const owner_id = req.params.owner_id;
  try {
    await deleteAllOwnerInnerComments(owner_id);
    return res.status(200).json({ deleted_owner: owner_id });
  } catch (e) {
    getException(res, e);
  }
}

module.exports = {
  httpCreateInnerComment,
  httpDeleteInnerComment,
  httpGetInnerComments,
  httpUpdateInnerComment,
  httpDeleteAllInnerComments,
};
