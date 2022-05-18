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

const comments_schema = new mongoose.Schema({
  owner_id: {
    type: String,
    required: true,
  },
  post_id: {
    type: String,
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
  inner_comment_count: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Comment", comments_schema);

// content: {
//   description: {
//     type: String,
//     maxlength: 250,
//     required: function () {
//       return !this.content.media_locator;
//     },
//   },
//   media_locator: {
//     type: String,
//     required: function () {
//       return !this.content.description;
//     },
//   },
// },
