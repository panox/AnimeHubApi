var mongoose = require("mongoose");
var Anime   = require('../models/anime');

// Database
var config = require('../config/config');
mongoose.connect(config.database);

Anime.create({"_id": "20", title: "test"})


console.log("done")