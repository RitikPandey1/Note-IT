const mongoose = require('mongoose');

const share_schema = new mongoose.Schema({

    note:{
        type:mongoose.Schema.ObjectId,
        ref:'note'
    },

    from:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    
    to:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    delete_by:{
        type:String,
        default:undefined
    }
});


const Share = new mongoose.model('Share',share_schema);


module.exports = Share;