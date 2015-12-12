var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  title: String,
  content: String,
  score: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Comment", CommentSchema);