const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); 
const user_schema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Username is required'],
        unique:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Email is not valid'],
        required:[true,'Email is required']
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    password:{
        type:String,
        required:[true,'Provide your password'],
        minlength:[8,'password must me 8 character long'],
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,'Confirm your password'],
        validate:{
            validator:function(el){
                return el===this.password
            },
            message:'Password and confirm password are not same'
        }
    },
    passwordChangeAt: Date,
    reset_token:{
        type:String,
        default:undefined
    },
    reset_token_exp: {
        type:Date,
        default:undefined
    }
});

user_schema.pre('save', async function(next){

    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,14);
    this.confirmPassword = undefined;
    next();

});

user_schema.pre('save',function(next){
    if(!this.isModified('password')||this.isNew) return next();
    this.passwordChangeAt = Date.now();
    next();
})

user_schema.methods.checkPassword = async function(given_pass,req_pass){
 
     return await bcrypt.compare(given_pass,req_pass);
}

user_schema.methods.checkPasswordChange = function(timestamp){
if(this.passwordChangeAt){
const chng_time = parseInt(this.passwordChangeAt.getTime()/1000,10);

return timestamp<chng_time;
} 
return false;
}

user_schema.methods.createtoken = function(){

    let string = crypto.randomBytes(32).toString('hex');

    this.reset_token = crypto.createHash('sha256').update(string).digest('hex');

    this.reset_token_exp = Date.now() + 10*60*1000;
    
    
 
    return string;
}

const User = new mongoose.model('User',user_schema);

module.exports = User;