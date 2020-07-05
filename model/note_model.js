const mongoose = require('mongoose');

const note_schema = new mongoose.Schema({

    title:{
        type:String,
        required:[true,'Title is necessary in notes']
    },
    
    text:{
        type:String,
        required:true
    },
    
    owner_id: {
        type: mongoose.Schema.ObjectId,
        ref:'User'
    }
});




const Note = new mongoose.model('note',note_schema);

module.exports = Note;