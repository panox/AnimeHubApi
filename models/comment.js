var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  title: String,
  content: String,
  score: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  anime: { type: mongoose.Schema.Types.String, ref: 'Anime'}
});

module.exports = mongoose.model("Comment", CommentSchema);