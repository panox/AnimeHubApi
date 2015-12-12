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
}
// client url
var client = request.createClient('https://anilist.co/api/');
//post to get token back
client.post('auth/access_token', data, function(err, res, body) {
  if (err) return console.log(err) //error
  var clientToken = body["access_token"];
  var sendClientToken = '?access_token=' + clientToken
  var params = 
    '&season=fall' +
    '&sort=score-desc' +
    '&type=TV' +
    '&status=Currently%20Airing'
  var getUrl = 'browse/anime' + sendClientToken + params
  //get all anime with url params
  client.get(getUrl, function(err, res, body) {
    if (err) return console.log(err) //error
    // loop request for every anime from browse response
    for (var i = body.length - 1; i >= 0; i--) {
      var animeId = body[i].id
      var url = 'anime/' + animeId + sendClientToken
      // get data for each anime by get request
      client.get(url, function(err, res, body) {
        if (err) return console.log(err) //error
        Anime.create({
          _id: body.id,
          picture: body.image_url_lge,
          title: body.title_romaji,
          rating: body.average_score,
          episodes: body.total_episodes,
          description: body.description,
          comments: []
        })
      })
    };
  });
});

console.log("done")

