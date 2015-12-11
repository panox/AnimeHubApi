var express  = require('express');
var router   = express.Router();
var passport = require("passport");



var usersController = require('../controllers/usersController');
var authenticationsController = require('../controllers/authenticationsController');

var upload = require(__dirname +"/upload.js")

//routes
router.post('/signup', authenticationsController.signup);
router.post('/login', authenticationsController.login);

router.route('/users')
  .get(usersController.usersIndex);


router.route('/users/:id')
  .get(usersController.userShow)
  .put(usersController.userUpdate)
  .delete(usersController.userDelete);

module.exports = router