const passport = require("passport");
const User     = require('../models/user');
const jwt      = require('jsonwebtoken');
const secret   = process.env.ANIME_SECRET;

// signup
function signup(req, res, next) {
  const localStrategy = passport.authenticate('local-signup', function(err, user, message) {
    if (err) return res.status(500).json({ message: err });
    if (!user) return res.status(401).json({ message: 'This email already exists' });

    console.log("HERE", secret);

    var token = jwt.sign(user, secret, { expiresIn: 60*60*24 });

    console.log(token);

    return res.status(200).json({ 
      success: true,
      message: "Thank you for signing up",
      user: user,
      token: token
    });
  });

  return localStrategy(req, res, next);
}

//login
function login(req, res, next) {
  User.findOne({
    "local.email": req.body.email
  }, function(err, user) {
    if (err) return res.status(500).json(err);
    if (!user) return res.status(403).json({ message: 'Wrong Credentials' });
    if (!user.validPassword(req.body.password)) return res.status(403).json({ message: 'Wrong Credentials' });

    let token = jwt.sign(user, secret, { expiresIn: 60*60*24 });

    return res.status(200).json({
      success: true,
      message: 'Welcome!',
      token: token,
      user: user
    });
  });
}

module.exports = {
  signup: signup,
  login: login
};