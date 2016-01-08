var request = require('request-json');
var mongoose = require("mongoose");
var Anime   = require('../models/anime');
var Token = require('./aniToken');

// Database
var config = require('../config/config');
mongoose.connect(config.database);

function updateRating(sendClientToken, client) {
  Anime.find().exec(function(err, animes){
    if (err) return console.log(err); //error
    // loop through all animes in db
    for (var i = 0; i < animes.length; i++) {
      var id = animes[i]._id;
      var url = 'anime/' + id + sendClientToken;
      // request from api every anime in the db
      client.get(url, function (err, res, body) {
        // updates the current data in database
        Anime.update({ _id: body.id }, { $set: { rating: body.popularity }}, function (err, anime) {
          if (err) return console.log(err); //error
        });
      });
    }
  });
}

Token.getAniToken(updateRating);
