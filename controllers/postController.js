
const Account = require('../models/accountModel');
const Response = require('../utilites/response');


postFromReq=(req)=>{
    let text = req.body.text;
    let author = req.user.id;
    let date = new Date();
    let likes = [];
    let post = { date,text,author,likes }
    return post
}



module.exports = {
    createNewPost: async (req,res) => {
        try{
            let user = req.user;
            let newPost = postFromReq(req);
            user.posts.push(newPost);
            await user.save();
            Response.responseModel(res,200,'ok','post created sucessfuly',newPost);
        }catch(err){
            Response.responseModel(res,500,'error','error creating nee post',err);
        }
    },
    getAllPosts: async(req,res) => {
        try{
            let id = req.params.id;
            let account = await Account.findById(id);
            let posts = account.posts;
            Response.responseModel(res,200,'ok','posts retrieved from user',posts);
        }catch(err){
            Response.responseModel(res,500,'error','error retrieving posts',err);
        }
    },
    getOnePost: async(req,res) => {
        try{
            let id = req.params.id;
            let index = req.params.index;
            let account = await Account.findById(id);
            let post = account.posts[index];
            Response.responseModel(res,200,'ok','post retrieved from user',post);
        }catch(err){
            Response.responseModel(res,500,'error','error retrieving posts',err);
        }
    },
    editOnePost: async(req,res) => {
        try{
            let newText = req.body.text;
            let index = req.params.id;
            console.log(index);
            let account = req.user;
            account.posts[index].text = newText;
            account.markModified('posts');    
            account.save();
            Response.responseModel(res,200,'ok','post edited',account.posts[index]);
        }catch(err){
            Response.responseModel(res,500,'error','error editing post',err);
        }
    },
    deleteOnePost: async(req,res) =>{
        try{
            let index = req.params.id;
            let account = req.user;
            account.posts.splice(index,1);
            await account.save();
            Response.responseModel(res,200,'ok','post deleted',null);
        }catch(err){
            Response.responseModel(res,500,'error','error deleting post',err);
        }
    }
}