const JWT = require('jsonwebtoken');

const Account = require('../models/accountModel');
const config = require('../config/config');

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
                res.status(200).send({
                    status:'ok',
                    status_message:'account created',
                    data: token
                })
            }else{
                res.status(500).send({
                    status:'error',
                    status_message:'error creating account',
                    data: null
                })
            }
        }catch(err){
            res.status(500).send({
                status:'error',
                status_message:'error creating account',
                data: err
            })
        }
    },
    signIn:(req,res)=>{
        try{
            let token = signWithAccount(req.user);

            res.status(200).send({
                status:'ok',
                status_message:'account autenticated',
                body:token
            })
        }catch(err){
            res.status(500).send({
                status:'error',
                status_message:'error signing in',
                data: err
            })
        }
    },
    getAccount:async(req,res)=>{
        res.status(200).send({
            status:'ok',
            status_message:'user that made the request identified',
            data: req.user
        })
    },
    testAuth:(req,res)=>{

        console.log('authenticated')
        res.status(200).send({
            status:'ok',
            status_message:'authenticated',
            data:null
        })
    }

}