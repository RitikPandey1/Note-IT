
import {show_alert , remove_alert} from './alert';

export const sign_in = async(name,email,password,confirmPassword)=>{

try{
   
   const res = await axios({
    method:'POST',
    url:'api/v1/user/signup',
    data:{
        name,
        email,
        password,
        confirmPassword     
    }
});


if(res.data.status==="Success"){
    location.assign('/');
}

 
}catch(err){
  
    if(err.response){
        show_alert(err.response.data.error,'sign');
        remove_alert();

    } 
    console.log(err);

}


}