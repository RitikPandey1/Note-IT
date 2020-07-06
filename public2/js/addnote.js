


export const add_note = async(title,text)=>{
try{
  const res =   await axios({
        method:'POST',
        url:'api/v1/notes',
        data:{
            title,
            text
        }
    });

if(res.data.status==='Success') location.reload(true);

}catch(err){
    alert(err);
    if(err.response){
       console.log(err.response.data);  
    }
 
}
}