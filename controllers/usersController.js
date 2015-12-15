var User   = require('../models/user');
var stripe = require('stripe')(process.env.StripeTestSecretKey);

//get all the users
function usersIndex(req, res) {
  User.find(function(err, users){
    if (err) return res.status(404).json({message: 'No users found'});
    res.status(200).json({ users: users });
  });
}

//get one user
function userShow(req, res){
  User.findById(req.params.id, function(err, user){
    if (err) return res.status(404).json({message: 'No user found'});
    res.status(200).json({ user: user });
  });
}

//update one user
function userUpdate(req, res){
  User.findById(req.params.id,  function(err, user) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!user) return res.status(404).json({message: 'No user found.'});

    if (req.body.email) user.local.email = req.body.name;
    if (req.body.password) user.local.password = req.body.password;
    if (req.body.first_name) user.first_name = req.body.first_name;
    if (req.body.last_name) user.last_name = req.body.last_name;
    if (req.body.picture) user.picture = req.body.picture;
    if (req.body.username) user.username = req.body.username;

    user.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'User successfully updated.', user: user});
    });
  });
}

//delete one user
function userDelete(req, res){
  User.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Could not delete user'});
   res.status(200).json({message: 'User has been successfully deleted'});
  });
}

//user payment
function userPay(req, res){
  var stripeToken = req.body.stripeToken;
  var charge = stripe.charges.create({
    amount: 1000, // amount in cents, again
    currency: "gbp",
    source: stripeToken,
    description: "Donation Charge"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
      res.status(500).json({message: 'The card has been declined', err: err});
    }
    else {
      var a = req.body
      res.status(200).json({charge: charge, body: a});
    }
    
  });
}

module.exports = {
  usersIndex:  usersIndex,
  userShow: userShow,
  userUpdate: userUpdate,
  userDelete: userDelete,
  userPay: userPay
}
