var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  title: { String, required: true }
  content: { String, required: true }
  score: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  anime: { type: mongoose.Schema.Types.String, ref: 'Anime', required: true }
});

module.exports = mongoose.model("Comment", CommentSchema);