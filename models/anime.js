var mongoose = require("mongoose");

var AnimeSchema = new mongoose.Schema({
  _id: String,
  picture: String,
  title: String,
  rating: String,
  episodes: String,
  description: String
});

module.exports = mongoose.model("Anime", AnimeSchema);