import{show_alert,remove_alert} from './alert';



export const login = async (email,password)=>{

    try{
      const res = await axios({
          method:'POST',
          url:'api/v1/user/login',
          data:{
              email,
              password
          }
      })

      console.log(res);

       if(res.data.status==="Success"){
           location.replace('/');
       }

    }catch(err){
       
 if(err.response){
    console.log(err.response.data);  
    show_alert(err.response.data.error,'login');
    remove_alert();
 }
     console.log(err);
    }


}