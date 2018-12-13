const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const accountSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    posts:{
        type:Array,
        required:true,
        default:[]
    },
    following:{
        type:Array,
        required:true,
        default:[]
    },
    followers:{
        type:Array,
        required:true,
        default:[]
    }
});

accountSchema.pre('save',async function (next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPasswd = await bcrypt.hash(this.password,salt);
        this.password = hashedPasswd;
        next()
    }catch(err){
        next(err)
    }
})

accountSchema.methods.isValidPassword = async function(pass){
    return await bcrypt.compare(pass,this.password);
}

const Account = mongoose.model('account',accountSchema);
module.exports = Account;
