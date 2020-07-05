export const del_sent =async (id)=>{
try{
    const res = await axios({
        method:'DELETE',
        url:`/api/v1/notes/sent/delete/${id}`
        });

      if(res.data.status==="Success") location.reload(true);  
}catch(err){
    if(err.response) console.log(err.response.data);
}

}

export const  del_rece = async(id)=>{

    try{
        const res = await axios({
            method:'DELETE',
            url:`/api/v1/notes/receive/delete/${id}`
            });
    
          if(res.data.status==="Success") location.reload(true);  
    }catch(err){
        if(err.response) console.log(err.response.data);
    }

}