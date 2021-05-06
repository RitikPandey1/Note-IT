const User = require('../model/user_model');
const catch_err = require('../util/async_catch');
const Apperr = require('../util/Apperr');
const jwt = require('jsonwebtoken');
const Send_mail = require('../util/email');
const crypto = require('crypto');
const util = require('util');
const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');



const multer_storage = multer.memoryStorage();
const multer_filter = (req,file,cb)=>{
  if(file.mimetype.startsWith('image')){
    cb(null,true);
  }else{
    cb(new Apperr('Please upload image file!!',400),false);
  }

}
const upload  = multer({
  storage:multer_storage,
  fileFilter:multer_filter
});

exports.upload_pic = upload.single('photo');



exports.resize = async (req,res,next)=>{

  if(!req.file) next();

  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
              .resize(500,500)
              .toFormat('jpeg')
              .jpeg({quality:90})
              .toFile(`public2/user_pic/${req.file.filename}`);
   next();           

}



const create_jwt = (id)=> jwt.sign({id},process.env.jwt_PK,{ expiresIn: process.env.jwt_exp});

const send_token = (res,token,message)=>{
 const cookie_option = {
   expires : new Date(Date.now()+process.env.cookie_exp *24*60*60*1000),
   httpOnly:true
  }
  if(process.env.NODE_ENV ==='production') cookie_option.secure = true;

res.cookie('jwt',token,cookie_option);

res.status(200).json({
  status:"Success",
  message
})
}  

exports.sign_up = catch_err(async(req,res,next)=>{

const user =  await User.create({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password,
      confirmPassword:req.body.confirmPassword
  });
  
 const token = create_jwt(user._id);
 send_token(res,token,"sign up successfully !!");

});

exports.login = catch_err(async(req,res,next)=>{

    if(!req.body.email&&!req.body.password) return next( new Apperr('Please provide email or password',400));
    
     const user = await User.findOne({email:req.body.email}).select('+password');
    
     if(!user || !await user.checkPassword(req.body.password,user.password)) return next(new Apperr('Email or password is incorrect  ',400));

      const token = create_jwt(user._id);
      send_token(res,token,"login successfully !!");
  
});


exports.firewall =catch_err(async(req,res,next)=>{

// check for token 
let token;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

  token = req.headers.authorization.split(" ")[1];

}else if(req.cookies.jwt){

  token = req.cookies.jwt;
}

if(!token || token==='logout')  return next( new Apperr('Please login to get access',401));

//verfiy jwt token

const decode = await jwt.verify(token,process.env.jwt_PK);

//check user in db
const user = await User.findById(decode.id);

if(!user) return next(new Apperr('User not exists ,this token is not valid',401))

//check wether user chnge pass or not

if(user.checkPasswordChange(decode.iat)){
  return next(new Apperr('User change password ,please login again',401));
}

req.user = user;
res.locals.user = user;

next();
}); 


// --- forgot password & reset password option is only available in api ----

exports.forgot_password = catch_err(async(req,res,next)=>{

  if(!req.body.email) return next(new Apperr('Please provide email',400));

  const user=  await User.findOne({email:req.body.email}).select('+password');
  
  if(!user) return next(new Apperr('User not found ,Please create account first',401));
  
  const reset_token  = user.createtoken();
  
  const url = `${req.protocol}://${req.get('host')}/resetpassword/${reset_token}`;
  
  const subject = 'Password  Reset link (valid for 10 mins)';
  
  Send_mail('PasswordReset',subject,url,req.body.email);
  
  await user.save({validateBeforeSave:false});

  res.status(200).json({status:"Success" ,message:`password  reset link is send at ${req.body.email} `});


});



exports.reset_password = catch_err(async(req,res,next)=>{

  const hash = crypto.createHash('sha256').update(req.params.reset_token).digest('hex');
   
  const user =  await User.findOne({reset_token:hash,reset_token_exp:{$gt:Date.now()}});

  if(!user) return next(new Apperr('Reset token has expired or not valid',400));

  user.password = req.body.password;
  
  user.confirmPassword = req.body.confirmPassword;
  
  user.reset_token = undefined;

  user.reset_token_exp = undefined;
  
  await user.save();
  
  const token = create_jwt(user._id);
  send_token(res,token,"password reset done !");

});

//---------------------------------------------------------------------------------


exports.logout = (req,res,next)=>{
  
 res.cookie('jwt',"logout",{
  expires : new Date(Date.now()+10*1000),
  httpOnly:true,
  secure: process.env.NODE_ENV ==='production'? true:false
 });

 res.redirect('/');

}


exports.islog = async(req,res,next)=>{

 
  if(req.cookies.jwt){
    try{   

    if(req.cookies.jwt==='logout')  return next();
  
  //verfiy jwt req.cookies.jwt
  const decode = await jwt.verify(req.cookies.jwt,process.env.jwt_PK);
  
  //check user in db
  const user = await User.findById(decode.id);
  
  if(!user) return next();
  
  //check wether user chnge pass or not
  
  if(user.checkPasswordChange(decode.iat)) return next();

  res.locals.user = user;
  req.user = user;
  
  return next();
}catch(err){
  console.log(err);
 return next();
}
  }
  next();
};

exports.get_user = catch_err( async(req,res,next)=>{

if(req.body.name===req.user.name){
return next(new Apperr('User not found',400));
}
  const user = await User.findOne({name:req.body.name});

 if(!user) return next(new Apperr('User not found',400));

 res.status(200).json({
   status:"Success",
   user
 });

});

exports.update_me = catch_err(async(req,res,next)=>{
const upd_obj = {
   name:req.body.name,
  email:req.body.email,
  photo: {  }
  };
  
 if(req.file){ 
  upd_obj.photo.data = await  util.promisify(fs.readFile)(`./public2/user_pic/${req.file.filename}`);
  upd_obj.photo.contentType = req.file.mimetype; 
   }

await User.findByIdAndUpdate(req.user._id,upd_obj,{
  new:true,
  runValidators:true
});

res.status(200).json({
  status:"Success",
  message:"User updated !"
})


});

exports.update_password = catch_err(async(req,res,next)=>{
 
  const user = await User.findById(req.user._id).select('+password');
  
  if(!await user.checkPassword(req.body.Currentpassword,user.password)) return next(new Apperr('Current password is not correct',400));

  user.password = req.body.newpassword;
  user.confirmPassword = req.body.confirmNewPassword;
  await user.save();
  
  const token = create_jwt(req.user._id);
  
  send_token(res,token,"password update !");
  
  
  });