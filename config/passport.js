const LocalStrategy = require("passport-local").Strategy;
const User          = require("../models/user");

// passport local strategy
module.exports = function(passport) {

  passport.use('local-signup', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  }, function(req, email, password, done) {

    // Find a user with this email
    User.findOne({ 'local.email' : email }, function(err, user) {
      // Error found
      if (err) return done(err, false, { message: "Something went wrong." });

      // No error but already an user registered
      if (user) return done(null, false, { message: "Please choose another email." });

      var newUser            = new User();
      newUser.local.email    = email;
      newUser.local.password = User.encrypt(password);
      newUser.first_name     = req.body.first_name;
      newUser.last_name      = req.body.last_name;
      newUser.picture        = req.body.picture;
      newUser.username       = req.body.username;

      newUser.save(function(err, user) {
        // Error found
        if (err) return done(err, false, { message: "Something went wrong." });
        
        // New user created
        return done(null, user);
      });
    });
  }));
  
};