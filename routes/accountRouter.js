const Router = require('express-promise-router')();
const passport = require('passport');
const passportconf = require('../passport');

//controllers
const accountController = require('../controllers/accountController.js');

//passport
const passportJWT = passport.authenticate('jwt',{session:false});
const passportSignin = passport.authenticate('local',{session:false});

//everything based in /api/account

Router.route('/signup')
    .post(accountController.signUp);

Router.route('/signin')
    .post(passportSignin,accountController.signIn);

Router.route('/test')
    .get(passportJWT,accountController.testAuth);

Router.route('/')
    .get(passportJWT,accountController.getAccount);


module.exports = Router;