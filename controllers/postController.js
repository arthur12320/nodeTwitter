
const Account = require('../models/accountModel');

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
            res.status(200).send({
                status:'ok',
                status_message:'post created sucessfuly',
                data: newPost
            })
        }catch(err){
            res.status(500).send({
                status:'error',
                status_message:'error creating new post',
                data: err
            })
        }
    },
    getAllPosts: async(req,res) => {
        try{
            let id = req.params.id;
            let account = await Account.findById(id);
            let posts = account.posts;
            res.status(200).send({
                status:'ok',
                status_message:'posts retrived from user',
                data: posts
            })
        }catch(err){
            res.status(500).send({
                status:'error',
                status_message:'error retrieving posts',
                data: err
            })
        }
    },
    getOnePost: async(req,res) => {
        try{
            let id = req.params.id;
            let index = req.params.index;
            let account = await Account.findById(id);
            let post = account.posts[index];
            res.status(200).send({
                status:'ok',
                status_message:'post retrived from user',
                data: post
            })
        }catch(err){
            res.status(500).send({
                status:'error',
                status_message:'error retrieving post',
                data: err
            })
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
            res.status(200).send({
                status:'ok',
                status_message:'post edited',
                data: account.posts[index]
            })
        }catch(err){
            res.status(500).send({
                status:'error',
                status_message:'error editing post',
                data: err
            })
        }
    },
    deleteOnePost: async(req,res) =>{
        try{
            let index = req.params.id;
            let account = req.user;
            account.posts.splice(index,1);
            await account.save();

            res.status(200).send({
                status:'ok',
                status_message:'post deleted',
                data: null
            })
        }catch(err){
            res.status(500).send({
                status:'error',
                status_message:'error deleting post',
                data: err
            })
        }
    }
}