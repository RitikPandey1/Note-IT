export const get_user = async(user,note)=>{
try{
    const res =await axios({
     method:'POST',
     url:'/get_user',
     data:{
         name:user
     }
});
    console.log(res.data);
    if(res.data.status==="Success"){
      const html = `
      <div class="user_box" data-to= ${res.data.user._id} data-note=${note}>
      
      <h1> <img src="/user_pic/${res.data.user.photo}"> ${res.data.user.name}</h1>
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