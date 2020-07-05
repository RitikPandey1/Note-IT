
import {show_alert , remove_alert} from './alert';

export const sign_in = async(name,email,password,confirmPassword)=>{

try{
    console.log(name,email,password,confirmPassword);
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
console.log(res.data);

if(res.data.status==="Success"){
    location.assign('/');
}

 
}catch(err){
  
    if(err.response){
        show_alert(err.response.data.error,'sign');
        remove_alert();

    } console.log(err.response.data);
    console.log(err);

}


}