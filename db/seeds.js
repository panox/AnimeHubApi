const mongoose = require("mongoose");
const Token = require('./aniToken');
const AnimeSeason = require('./animeSeason');

// Database
var config = require('../config/config');
mongoose.connect(config.database);

Token.getAniToken(AnimeSeason.createSeason);

console.log("done");
