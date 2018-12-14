
const Account = require('../models/accountModel');
const Response = require('../utilites/response');


module.exports={
    like: async(req,res) => {
        try{
            let myid = req.user.id;
            let id = req.params.id;
            let index = req.params.index;
            let account = await Account.findById(id);
            let post = account.posts[index];
            post.likes.push(myid);
            account.markModified('posts');    
            account.save();
            Response.responseModel(res,200,'ok','post liked',null);
        }catch(err){
            Response.responseModel(res,500,'error','error liking post',err);
        }
    },
    dislike: async(req,res) => {
        try{
            let myid = req.user.id;
            let id = req.params.id;
            let index = req.params.index;
            let account = await Account.findById(id);
            let likes = account.posts[index].likes;
            likes.forEach((element,ind) => {
                if(element==myid){
                    likes.splice(ind,1);
                }
            });
            account.markModified('posts');    
            account.save();
            Response.responseModel(res,200,'ok','post disliked',null);
        }catch(err){
            Response.responseModel(res,500,'error','error disliking post',err);
        }
    },
}