const Anime   = require('../models/anime');
const Token = require('./aniToken');

let AnimeSeason = {
  season: function getSeason() {
      let month = new Date().getMonth();
      let winter = '0,1,2';
      let spring = '3,4,5,';
      let summer = '6,7,8,';
      let fall = '9,10,11,';
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
  }(),
  updateDescriptions: function (sendClientToken, client) {
    Anime.find().exec(function(err, animes){
      if (err) return console.log(err); //error
      // loop through all animes in db
      for (var i = 0; i < animes.length; i++) {
        let id = animes[i]._id;
        let url = 'anime/' + id + sendClientToken;
        // request from api every anime in the db
        client.get(url, function (err, res, body) {
          // updates the current data in database
          let re = /<br>|\(Source.+/g;
          let description = body.description.replace(re, "");
          Anime.update({ _id: body.id }, { $set: { description: description }}, function (err, anime) {
            if (err) return console.log(err); //error
          });
        });
      }
    });
  },
  createSeason: function (sendClientToken, client) {
    // Clear All Anime
    Anime.find().exec(function(err, animes){
      animes.forEach( function (anime) {
        anime.remove();
      });
    });
    // Get New Anime
    let params =
      '&year=' + new Date().getFullYear() +
      '&season=' + AnimeSeason.season +
      '&type=TV' +
      '&sort=popularity-desc';

    let getUrl = 'browse/anime' + sendClientToken + params;
    //get all anime with url params
    client.get(getUrl, function(err, res, body) {
      if (err) return console.log(err); //error
      // loop request for every anime from browse response
      for (var i = 0; i < body.length -4; i++) {
        Anime.create({
          _id: body[i].id,
          title: body[i].title_romaji,
          rating: body[i].popularity,
          episodes: body[i].total_episodes,
          description: "",
          comments: []
        });
      }
      // update the description after entries have been created
      Token.getAniToken(AnimeSeason.updateDescriptions);
    });
  }
};

module.exports = AnimeSeason;
