

const Account = require('../models/accountModel');

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
                res.status(200).send({
                    status:'ok',
                    status_message:'following new account',
                    data:{
                        following: (account.following.length) -1
                    }
                })
            }else{
                res.status(500).send({
                    status:'error',
                    status_message:'invalid account id',
                    data:null
                }) 
            }
        }catch(err){
            res.status(500).send({
                status:'error',
                status_message:'error following new account',
                data:null
            }) 
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
                res.status(200).send({
                    status:'ok',
                    status_message:'following cancelled',
                    body: null
                })
            }else{
                res.status(500).send({
                    status:'error',
                    status_message:'invalid id',
                    body: null
                })
            }
        }catch(err){
            res.status(500).send({
                status:'error',
                status_message:'error canceling following',
                body: null
            })
        }
    },
    getFollowing:(req,res)=>{
        try{
            let account = req.user;
            res.status(200).send({
                status:'ok',
                status_message:'following retrieved',
                data: account.following
            })
        }catch(err){
            res.status(500).send({
                status:'error',
                status_message:'error retrieving following',
                data: null
            })
        }
    }
}