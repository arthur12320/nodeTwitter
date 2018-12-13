
const Account = require('../models/accountModel');

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
            res.status(200).send({
                status:'ok',
                status_message:'post liked',
                data: null
            })  
        }catch(err){
            res.status(500).send({
                status:'error',
                status_message:'error liking the post',
                data: err
            })
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
            res.status(200).send({
                status:'ok',
                status_message:'post disliked',
                data: null
            })
        }catch(err){
            res.status(500).send({
                status:'error',
                status_message:'error disliking post',
                data: err
            })
        }
    },
}