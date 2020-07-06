const Note = require('../model/note_model');
const catch_err = require('../util/async_catch');
const user_cntrl = require('./user_cntrl');
const Share =require('../model/share_model');

exports.main_view =catch_err( async(req,res,next)=>{
  let notes;
  const user = res.locals.user;
  let source='/user_pic/default.jpg';
 
  if(user) { 
   notes = await Note.find({owner_id:res.locals.user._id});
   
   if(user.photo.data){ 
       source = `data:${res.locals.user.photo.contentType};base64,${new Buffer.from(res.locals.user.photo.data).toString('base64')}`;
     }
    }
   
   res.status(200).render('base',{
           notes,
           source
         }); 
  
    
   
    

});

exports.login= (req,res,next)=>{
    if(res.locals.user) return res.redirect('/'); 

    res.status(200).render('login');

 
}


exports.share_note = (req,res,next)=>{

  if(!res.locals.user) return res.status(200).redirect('/');
  
  const name =  req.params.note;
  const note_id = req.params.id;
  res.status(200).render('search',{
    name ,
    note_id
  });

}

exports.sent_note = catch_err(async(req,res,next)=>{
  if(!res.locals.user) return res.status(200).redirect('/');
 
  const sent_note = await Share.find({from:res.locals.user._id}).populate({
    path:'note',
    select:'title text'
}).populate({
    path:'to',
    select:'name'
});
  res.status(200).render('sent',{
    sent_note
  });
});

exports.receive_note = catch_err(async(req,res,next)=>{
  if(!res.locals.user) return res.status(200).redirect('/');
  
  const received_note = await Share.find({to:res.locals.user._id}).populate({
    path:'note',
    select:'title text'
}).populate({
    path:'from',
    select:'name'
});




res.status(200).render('receive',{
  received_note
});

  

});

exports.me = (req,res,next)=>{
  const user = res.locals.user;

  if(!user) return res.status(200).redirect('/');
 
  let source='/user_pic/default.jpg';
  if(user.photo.data){ 
       source = `data:${res.locals.user.photo.contentType};base64,${new Buffer.from(res.locals.user.photo.data).toString('base64')}`;
    }
  
  res.status(200).render('account',{
    source
  });
}