
const msg_box = (msg)=>{
    if(!document.querySelector('.msg_box')){
  console.log('inside');        
const html =`
<div class="msg_box mx-auto">
<span>${msg}</span>
</div>
`;

document.querySelector('#search_form').insertAdjacentHTML('afterbegin',html);
 }

}

const remove = ()=>{
    setTimeout(()=>{
     const el = document.querySelector('.msg_box');
     if(el) el.parentElement.removeChild(el);
    
    },5000);
}

export const share_note = async (user,note)=>{
try{
    const res = await axios({
        method:'GET',
        url:`/api/v1/notes/sharenote/${JSON.parse(note)}/user/${JSON.parse(user)}`
    });
    console.log(res.data);
  if(res.data.status ==="Success"){
      msg_box('Note sent successfully!');
      remove();
  }

}catch(err){
    if(err.response){
     if(err.response.data.error==='Already sent note to this user'){
        msg_box(err.response.data.error);
        remove();
     }
        console.log(err.response.data);
    } 

}
    

}