var mongoose = require("mongoose");
var Anime   = require('../models/anime');
var Token = require('./aniToken');

// Database
var config = require('../config/config');
mongoose.connect(config.database);

Anime.create({
  _id: 20,
  title: "super",
  rating: 3000,
  description: "",
  comments: []
});

console.log("done");
