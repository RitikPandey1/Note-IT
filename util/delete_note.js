const Note = require('../model/note_model');
const Share = require('../model/share_model');





const delete_note = async()=>{
   
try{
     const note = await Note.find({owner_id:undefined});
     let i;
     for(i=0;i<note.length;i++){
               
     const check = await Share.find({note:note[i]._id});
      if(!check.length){ 
        
         const del =  await Note.deleteMany({owner_id:undefined});
         console.log('note delete');
      
        }  
}
      
 
}catch(err){
    console.log(err);
}    

}

module.exports = delete_note;