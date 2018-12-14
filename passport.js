const passport = require('passport');

const localStrategy = require('passport-local').Strategy;
const jwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const config = require('./config/config');
const Account = require('./models/accountModel')

passport.use(new localStrategy(
    async(username,password,done)=>{
        try{
            
            const account = await Account.findOne({username});
            console.log(account)
            if(!account){
                return done(null,false)
            }
            const isMatch = await account.isValidPassword(password);

            if(!isMatch){
                return done(null,false)
            }
            done(null,account);

        }catch(err){
            done(err,false);
        }
    }
))


passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.JWT_KEY
},async(payload,done)=>{
    try{
        const account = await Account.findById(payload.sub);

        if(!account){
            return done(null,false);
        }
        done(null,account);
    }catch(err){
       
        done(err,false);
    }
}))