const JWT = require('jsonwebtoken');

const Account = require('../models/accountModel');
const config = require('../config/config');
const Response = require('../utilites/response.js');


signWithAccount = user => {
    return token = JWT.sign({
        iss: 'faektwitter',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate()+1)
    },config.JWT_KEY);
}


module.exports = {

    signUp:async(req,res)=>{
        const {username,password} = req.body;
        const past = await Account.findOne({username});
        try{
            if(!past){
                const newAccount = new Account({
                    username,password
                });
                await newAccount.save();

                let token = signWithAccount(newAccount);
                Response.responseModel(res,200,'ok','account created',token);
            }else{
                Response.responseModel(res,500,'error','error creating account',null);
            }
        }catch(err){
            Response.responseModel(res,500,'error','error creating account',err);
        }
    },
    signIn:(req,res)=>{
        try{
            let token = signWithAccount(req.user);
            Response.responseModel(res,200,'ok','account authenticated',token);
        }catch(err){
            Response.responseModel(res,500,'error','error signing in',err);
        }
    },
    getAccount:async(req,res)=>{
        Response.responseModel(res,200,'ok','user that made the request identified',req.user);
    },
    testAuth:(req,res)=>{
        Response.responseModel(res,200,'ok','authenticated',null);
    }

}