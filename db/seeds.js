var mongoose = require("mongoose");
var Anime   = require('../models/anime');

// Database
var config = require('../config/config');
mongoose.connect(config.database);

Anime.find().exec(function(err, animes){
  animes.remove();
  console.log(animes);
});

console.log("done");
