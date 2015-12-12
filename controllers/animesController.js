var Anime   = require('../models/anime');

//get all the users
function usersIndex(req, res) {
  User.find().populate('images').exec(function(err, users){
    if (err) return res.status(404).json({message: 'No users found'});
    res.status(200).json({ users: users });
  });
}

//get one user
function userShow(req, res){
  User.findById(req.params.id).populate('images').exec( function(err, user){
    if (err) return res.status(404).json({message: 'No user found'});
    res.status(200).json({ user: user });
  });
}

module.exports = {
  animesIndex:  animesIndex,
  animeShow: animeShow,
}