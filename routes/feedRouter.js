const Router = require('express-promise-router')();
const passport = require('passport');
const passportconf = require('../passport');

//controllers
const feedController = require('../controllers/feedController');


//passport
const passportJWT = passport.authenticate('jwt',{session:false});


//everything based in /api/feed

//like post off index of the account and with id
Router.route('/')
    .get(passportJWT,feedController.getFeed);


module.exports = Router;