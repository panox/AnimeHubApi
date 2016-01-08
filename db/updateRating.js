var request = require('request-json');
var Anime   = require('../models/anime');
var Token = require('./aniToken');

var Rating = {
  updateRating: function (sendClientToken, client) {
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
};

module.exports = Rating;
