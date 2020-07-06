export const get_user = async(user,note)=>{
try{
    const res =await axios({
     method:'POST',
     url:'/get_user',
     data:{
         name:user
     }
});
    
    if(res.data.status==="Success"){
      let source = '/user_pic/default.jpg';
      if(res.data.user.photo)  source =`data:${res.data.user.photo.contentType};base64,${new Buffer.from(res.data.user.photo.data).toString('base64')}`
      const html = `
      <div class="user_box" data-to= ${res.data.user._id} data-note=${note}>
      
      <h1> <img src= ${source}> ${res.data.user.name}</h1>
      </div>
      `
      document.querySelector('.search_res').innerHTML='';
     document.querySelector('.search_res').insertAdjacentHTML('afterbegin',html);

    }
}catch(err){
    if(err.response){
      if(err.response.data.error==='User not found')
      {
        const html = `
        <div class="not-found">
         <h>User not found<h>
        </div>
        `
        document.querySelector('.search_res').innerHTML='';
       document.querySelector('.search_res').insertAdjacentHTML('afterbegin',html);
      }
    } 
     
    console.log(err);
}

}