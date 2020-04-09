const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  score: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  anime: { type: mongoose.Schema.Types.String, ref: 'Anime', required: true }
});

module.exports = mongoose.model("Comment", CommentSchema);