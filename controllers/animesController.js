var Anime   = require('../models/anime');
var Comment   = require('../models/comment');

//get all the animes
function animesIndex(req, res) {
  Anime.find().sort('-rating').exec(function(err, animes){
    if (err) return res.status(404).json({message: 'No animes found'});
    res.status(200).json({ animes: animes });
  });
}

//get one anime
function animeShow(req, res){
  Anime.findById(req.params.id).populate('comments').exec(function(err, anime){
    if (err) return res.status(404).json({message: 'No anime found'});
    res.status(200).json({ anime: anime });
  });
}

module.exports = {
  animesIndex:  animesIndex,
  animeShow: animeShow,
}