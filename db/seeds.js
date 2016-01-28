var mongoose = require("mongoose");
var Anime   = require('../models/anime');
var Token = require('./aniToken');
var AnimeSeason = require('./animeSeason');

// Database
var config = require('../config/config');
mongoose.connect(config.database);

Token.getAniToken(AnimeSeason.createSeason);

console.log("done");
