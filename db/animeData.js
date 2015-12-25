var request = require('request-json');
var mongoose = require("mongoose");
var Anime   = require('../models/anime');

// Database
var config = require('../config/config');
mongoose.connect(config.database);

//data to get token
var data = {
  grant_type    : "client_credentials",
  client_id     :  process.env.ClientID,
  client_secret :  process.env.ClientSecret,
};
// client url
var client = request.createClient('https://anilist.co/api/');
//post to get token back
client.post('auth/access_token', data, function(err, res, body) {
  if (err) return console.log(err); //error
  var clientToken = body.access_token;
  var sendClientToken = '?access_token=' + clientToken;
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
  });
});

console.log("done");
