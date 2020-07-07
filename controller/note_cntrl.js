const Note = require('../model/note_model');
const catch_err = require('../util/async_catch');
const Share = require('../model/share_model');
const Apperr = require('../util/Apperr');

const response = (res,data)=> res.status(200).json({ status: 'Success' , data });


exports.get_note =catch_err( async (req,res,next)=>{
    const notes = await Note.find({owner_id:req.user._id});
     
    response(res,notes);
});


exports.add_note = catch_err(async(req,res,next)=>{
    
    req.body.owner_id = req.user._id;
    const note  = await Note.create(req.body);
    response(res,note);
});

exports.update_note = catch_err(async(req,res,next)=>{
    await Note.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    response(res,'Note  updated!');
});


exports.delete_note = catch_err(async(req,res,next)=>{
    const note =  await Note.findById(req.params.id);
    note.owner_id = undefined;
   await note.save({validateBeforeSave:false});
    response(res,'Note deleted !');
});

