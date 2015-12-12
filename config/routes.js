var express  = require('express');
var router   = express.Router();
var passport = require("passport");

var usersController = require('../controllers/usersController');
var animesController = require('../controllers/animesController');
var commentsController = require('../controllers/commentsController');
var authenticationsController = require('../controllers/authenticationsController');

var upload = require(__dirname +"/upload.js")

//Login System
router.post('/signup', authenticationsController.signup);
router.post('/login', authenticationsController.login);

//Users
router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.userShow)
  .put(usersController.userUpdate)
  .delete(usersController.userDelete);

//Animes
router.route('/animes')
  .get(animesController.animesIndex);

router.route('/anime/:id')
  .get(animesController.animeShow)

//Comments
router.route('/anime/:id/comments')
  .get(commentsController.commentsIndex);
  .post(commentsController.commentsCreate);

router.route('/comment/:id')
  .put(commentsController.commentUpdate)
  .delete(commentsController.commentDelete);

module.exports = router