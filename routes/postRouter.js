const Router = require('express-promise-router')();
const passport = require('passport');
const passportconf = require('../passport');

//controllers
const postController = require('../controllers/postController');
const likeController = require('../controllers/likeController');

//passport
const passportJWT = passport.authenticate('jwt',{session:false});


//everything based in /api/post

//like post off index of the account and with id
Router.route('/:id/:index/like')
    .post(passportJWT,likeController.like)
    .delete(passportJWT,likeController.dislike)

//get post of index of the account with the id
Router.route('/:id/:index')
    .get(postController.getOnePost)
 
//get all posts of the account with the id
Router.route('/:id')
    .get(postController.getAllPosts)
    .put(passportJWT,postController.editOnePost)//edit post of this user in this index
    .delete(passportJWT,postController.deleteOnePost)//delete post of this user in this index

//create a new post on the ccount that made the req
Router.route('/')
    .post(passportJWT,postController.createNewPost)



module.exports = Router;