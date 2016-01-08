var request = require('request-json');
var Anime   = require('../models/anime');
var Token = require('./aniToken');

// Database
var mongoose = require("mongoose");
var config = require('../config/config');
mongoose.connect(config.database);

function getSeason() {
    var month = new Date().getMonth();
    var winter = '0,1,2';
    var spring = '3,4,5,';
    var summer = '6,7,8,';
    var fall = '9,10,11,';
    if (winter.indexOf(month) != -1) {
        season = 'winter';
    } else if (spring.indexOf(month) != -1) {
        season = 'spring';
    } else if (summer.indexOf(month) != -1) {
        season = 'summer';
    } else if (fall.indexOf(month) != -1) {
        season = 'fall';
    }
    return season;
}

function createSeason(sendClientToken, client) {
  // Clear All Anime
  Anime.find().exec(function(err, animes){
    animes.forEach( function (anime) {
      anime.remove();
    });
  });
  // Get New Anime
  var params =
    '&year=' + new Date().getFullYear() +
    '&season=' + getSeason() +
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
