const Note = require('../model/note_model');
const catch_err = require('../util/async_catch');
const Share = require('../model/share_model');
const Apperr = require('../util/Apperr');


exports.check_note = catch_err(async(req,res,next)=>{
    
    const note = await Note.findOne({_id:req.params.note_id , owner_id:req.user._id});
    
    if(!note) return next(new Apperr('Note not found ',404));

    next();
});

exports.check_duplicate = catch_err(async(req,res,next)=>{
    
    const check = await Share.find({to:req.params.sent_to , note:req.params.note_id});

    if(check.length) return next(new Apperr('Already sent note to this user',400));
 
    next();
});

exports.share_note = catch_err(async(req,res,next)=>{

 await Share.create({
        note: req.params.note_id,
        from: req.user._id,
        to: req.params.sent_to
    });

    res.status(200).json({
        status:"Success",
        message:`note share with user_id : ${req.params.sent_to}`   
    });


});


exports.sent_note = catch_err(async(req,res,next)=>{
 
    // get sent note 
    const sent_note = await Share.find({from:req.user.id }).populate({
        path:'note',
        select:'title text'
    }).populate({
        path:'to',
        select:'name'
    });
    
    res.status(200).json({
        status:"Success",
        sent_note     
      
 });
    
});

exports.received_note = catch_err( async(req,res,next)=>{
    
    const recived_note = await Share.find({to:req.user.id}).populate({
        path:'note',
        select:'title text'
    }).populate({
        path:'from',
        select:'name'
    });
    
    res.status(200).json({
        status:"Success",
        recived_note     
      });
});

exports.sent_delete=catch_err(async(req,res,next)=>{

const share =  await Share.findOne({  _id:req.params.shareid});

if(!share) return next(new Apperr('Note not sent !!',500));
share.from = undefined;
share.note=undefined;
share.delete_by  = req.user.name;

await share.save({validateBeforeSave:false});


res.status(200).json({
    status:"Success",
    message:'sent note delete '
})

});


exports.receive_delete = catch_err(async(req,res,next)=>{

 const share = await Share.findOne({ _id:req.params.shareid });
 share.to=undefined;
 share.delete_by = req.user.name;
 await share.save({validateBeforeSave:false});

res.status(200).json({
    status:"Success", 
    message:'received note delete '
})


});

exports.delete = catch_err(async(req,res,next)=>{
   
     await Share.deleteMany({to:undefined,from:undefined});

     next();
});