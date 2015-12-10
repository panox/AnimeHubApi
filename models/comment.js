var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  title: String,
  content: String,
  score: String
});

module.exports = mongoose.model("Comment", CommentSchema);