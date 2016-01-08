var mongoose = require("mongoose");
var Anime   = require('../models/anime');
var Token = require('./aniToken');

// Database
var config = require('../config/config');
mongoose.connect(config.database);

console.log(new Date());
