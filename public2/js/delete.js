

export const delete_note = async(id)=>{
try{


    const res = await axios({
    method:'DELETE',
    url:`/api/v1/notes/${id}`
});

if(res.data.status==="Success"){
  location.reload(true);
   
}
}catch(err){
    console.log(err.response.data);
}

}