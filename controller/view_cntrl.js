const Note = require('../model/note_model');
const catch_err = require('../util/async_catch');
const user_cntrl = require('./user_cntrl');
const Share =require('../model/share_model');

exports.main_view =catch_err( async(req,res,next)=>{
  let notes;
  
   if(res.locals.user)  notes = await Note.find({owner_id:res.locals.user._id});
  console.log(res.locals.user);
   res.status(200).render('base',{
           notes
         }); 
  
    
   
    

});

exports.login= (req,res,next)=>{
    if(res.locals.user) return res.redirect('/'); 

    res.status(200).render('login');

 
}


exports.share_note = (req,res,next)=>{

  const name =  req.params.note;
  const note_id = req.params.id;
  res.status(200).render('search',{
    name ,
    note_id
  });

}

exports.sent_note = catch_err(async(req,res,next)=>{
  const sent_note = await Share.find({from:req.user.id }).populate({
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
console.log('kl')
  const received_note = await Share.find({to:req.user.id}).populate({
    path:'note',
    select:'title text'
}).populate({
    path:'from',
    select:'name'
});

console.log(received_note);


res.status(200).render('receive',{
  received_note
});

  

});

exports.me = (req,res,next)=>{

  res.status(200).render('account')
}