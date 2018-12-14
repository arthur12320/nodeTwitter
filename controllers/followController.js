

const Account = require('../models/accountModel');
const Response = require('../utilites/response');

testid = async (id) =>{
    let ok = id && id.toString().trim()!==''
    let b = await Account.findById(id)
    console.log("-"+b);
    return b && ok;
}


module.exports = {
    //follow the id from request
    follow:async (req,res)=>{
        try{
            let followid = req.body.id;
            if(testid(followid)){
                //get account that is following
                let account = req.user;
                //get account being followed
                let followAccount = await Account.findById(followid);
                //add this as follower 
                followAccount.followers.push(account.id);
                followAccount.markModified('followers');
                await followAccount.save();
                //add other to following
                account.following.push(followid);
                account.markModified('following');    
                await account.save();
                Response.responseModel(res,200,'ok','following new account',{following: (account.following.length) -1})
            }else{
                Response.responseModel(res,500,'error','invalid account id',null);
            }
        }catch(err){
            Response.responseModel(res,500,'error','error following new account',err); 
        }
    },
    unfollow:async(req,res)=>{
        try{
            let id = req.body.id;
            if(testid(id)){
                let account = req.user;
                let followedAccount = await Account.findById(id);
                account.following.forEach((element,index)=>{
                    if(id==element){
                        account.following.splice(index,1);
                    }
                })
                await account.save();
                //unfollow there
                let myid = account.id;
                followedAccount.followers.forEach((element,index)=>{
                    if(myid==element){
                        followedAccount.followers.splice(index,1);
                    }
                })
                await followedAccount.save();
                Response.responseModel(res,200,'ok','unfollowed',null);
            }else{
                Response.responseModel(res,500,'error','invalid id',null);
            }
        }catch(err){
            Response.responseModel(res,500,'error','error unfollowing',err);
        }
    },
    getFollowing:(req,res)=>{
        try{
            let account = req.user;
            Response.responseModel(res,200,'ok','following retrived',account.following);
        }catch(err){
            Response.responseModel(res,500,'error','error retrieving following',err);
        }
    }
}