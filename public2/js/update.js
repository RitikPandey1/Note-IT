

export const update_note = async(title,text,id)=>{
try{
   const res = await axios({
     method:'PATCH',
     url:`api/v1/notes/${id}`,
     data:{
         title,
         text
     }  
   });
  console.log(res.data);
  if(res.data.status==="Success") location.reload(true);
}catch(err){
    if(err.response) console.log(err.response.data);
}
    

}