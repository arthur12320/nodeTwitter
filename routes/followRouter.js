const Router = require('express-promise-router')();
const passport = require('passport');
const passportconf = require('../passport');

//controllers
const followController = require('../controllers/followController');

//passport
const passportJWT = passport.authenticate('jwt',{session:false});


//everything based in /api/follow


//get post of index of the account with the id
Router.route('')
    .get(passportJWT,followController.getFollowing)
    .post(passportJWT,followController.follow)
    .delete(passportJWT,followController.unfollow)




module.exports = Router;