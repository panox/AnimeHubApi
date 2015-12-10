var mongoose = require("mongoose");

var AnimeSchema = new mongoose.Schema({
  picture: String,
  title: String,
  score: String,
  episodes: String,
  description: String,
});

module.exports = mongoose.model("Anime", AnimeSchema);