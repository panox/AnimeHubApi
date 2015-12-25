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
        })
      });
    }
  });
});

console.log('done');




// var animeIds = [];
// animeIds.push(body[i].id);
// console.log(animeIds);
// var url = 'anime/' + animeId + sendClientToken;
// // get data for each anime by get request
// client.get(url, saveToDb);
// function saveToDb(err, res, body) {
//   if (err) return console.log(err); //error
//   // clear description
//   console.log(body);
//   var re = /<br>|\(Source.+/g;
//   var description = body.description.replace(re, "");
//   //create a mongoose document for every returned request
//   Anime.create({
//     _id: body.id,
//     picture: body.image_url_lge,
//     title: body.title_romaji,
//     rating: body.popularity,
//     episodes: body.total_episodes,
//     description: description,
//     comments: []
//   });
// }
