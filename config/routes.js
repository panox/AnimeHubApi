const express  = require('express');
const router   = express.Router();

const usersController = require('../controllers/usersController');
const animesController = require('../controllers/animesController');
const commentsController = require('../controllers/commentsController');
const authenticationsController = require('../controllers/authenticationsController');

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

router.route('/users/pay')
  .post(usersController.userPay);

//Animes
router.route('/animes')
  .get(animesController.animesIndex);

router.route('/anime/:id')
  .get(animesController.animeShow);

//Comments
router.route('/anime/:id/comments')
  .post(commentsController.commentsCreate);

router.route('/comment/:id')
  .put(commentsController.commentUpdate)
  .delete(commentsController.commentDelete);

module.exports = router;