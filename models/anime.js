var mongoose = require("mongoose");

var AnimeSchema = new mongoose.Schema({
  _id: String,
  picture: String,
  title: String,
  rating: Number,
  episodes: String,
  description: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model("Anime", AnimeSchema);
