const express        = require('express');
const cors           = require('cors');
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const passport       = require('passport');
const cookieParser   = require("cookie-parser");
const methodOverride = require("method-override");
const jwt            = require('jsonwebtoken');
const expressJWT     = require('express-jwt');
const app            = express();

const secret = process.env.ANIME_SECRET;

if(!secret) throw new Error('No secret in zshrc file');

// Database
const config = require('./config/config');
mongoose.connect(config.database);

// Require passport
require('./config/passport')(passport);

// Method Ovveride
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

// Protect Routes with token
app.use('/api', expressJWT({ secret: secret })
  .unless({
    path: [
      { url: '/api/login', methods: ['POST'] },
      { url: '/api/signup', methods: ['POST'] },
      { url: '/api/animes', methods: ['GET'] },
      { url: /\/api\/anime\/.*/, methods: ['GET'] }
    ]
  }));


// Routes
let routes = require('./config/routes');
app.use("/api", routes);

// Cron
let Token = require('./db/aniToken');
// Update Ratings
let Rating = require('./db/updateRating');
let CronJob = require('cron').CronJob;
new CronJob('00 30 23 * * 1', function() {
  Token.getAniToken(Rating.updateRating);
}, null, true, 'Europe/London');
// New Season
let AnimeSeason = require('./db/animeSeason');
new CronJob('00 30 23 01 0,3,6,9 *', function() {
  Token.getAniToken(AnimeSeason.createSeason);
}, null, true, 'Europe/London');

// Port
app.listen(process.env.PORT || 3000 );
console.log('listening to 3000');
