var request = require('request-json');
var mongoose = require("mongoose");
var Anime   = require('../models/anime');
var Token = require('./aniToken');

// Database
var config = require('../config/config');
mongoose.connect(config.database);

// Clear All Anime
Anime.find().exec(function(err, animes){
  animes.forEach( function (anime) {
    anime.remove();
  });
});

function createSeason(sendClientToken, client) {
  var params =
    '&year=2016' +
    '&season=winter' +
    '&type=TV' +
    '&sort=popularity-desc';

  var getUrl = 'browse/anime' + sendClientToken + params;
  //get all anime with url params
  client.get(getUrl, function(err, res, body) {
    if (err) return console.log(err); //error
    // loop request for every anime from browse response
    for (var i = 0; i < body.length - 3; i++) {
      Anime.create({
        _id: body[i].id,
        picture: body[i].image_url_lge,
        title: body[i].title_romaji,
        rating: body[i].popularity,
        episodes: body[i].total_episodes,
        description: "",
        comments: []
      });
    }
    // update the description after entries have been created
    Token.getAniToken(updateDescriptions);
  });
}

function updateDescriptions(sendClientToken, client) {
  Anime.find().exec(function(err, animes){
    if (err) return console.log(err); //error
    // loop through all animes in db
    for (var i = 0; i < animes.length; i++) {
      var id = animes[i]._id;
      var url = 'anime/' + id + sendClientToken;
      // request from api every anime in the db
      client.get(url, function (err, res, body) {
        // updates the current data in database
        var re = /<br>|\(Source.+/g;
        var description = body.description.replace(re, "");
        Anime.update({ _id: body.id }, { $set: { description: description }}, function (err, anime) {
          if (err) return console.log(err); //error
        });
      });
    }
  });
}

// Creates the whole season
Token.getAniToken(createSeason);
