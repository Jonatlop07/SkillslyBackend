const mongoose = require("mongoose");

const content_schema = new mongoose.Schema({
  description: {
    type: String,
    maxlength: 500,
  },
  media_locator: String,
  media_type: String,
  _id: false,
});

const inner_comments_schema = new mongoose.Schema({
  owner_id: {
    type: String,
    required: true,
  },
  comment_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  content: {
    type: content_schema,
    required: true,
    validate: {
      validator: function (s) {
        return (
          this.content.description.length > 0 ||
          this.content.media_locator.length > 0
        );
      },
    },
  },
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: Date,
});

module.exports = mongoose.model("InnerComment", inner_comments_schema);
