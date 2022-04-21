let exceptions_map = new Map();
exceptions_map.set("INVALID_COMMENT_FORMAT", 400);
exceptions_map.set("INVALID_COMMENT_CONTENT", 400);
exceptions_map.set("COMMENT_NOT_FOUND", 404);
exceptions_map.set("INVALID_INNER_COMMENT_FORMAT", 400);
exceptions_map.set("INNER_COMMENT_NOT_FOUND", 404);

function customException(message, code) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function getException(res, exception) {
  const { code, message } = exception;
  const status = exceptions_map.get(code) || 500;
  return res.status(status).json({
    error: {
      code,
      message,
    },
  });
}

module.exports = { customException, getException };
