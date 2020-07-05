export const update_me = async(data,type)=>{
try{
const url = type==='password'? '/api/v1/user/update_password' : '/api/v1/user/update_me';
const res = await axios({
    method:'PATCH',
    url,
    data
});
console.log(res);
document.querySelector('#pass_cur').innerHTML=' ';
if(res.data.status=='Success') location.reload(true);

}catch(err){
    if(err.response){
        console.log(err.response.data);
        if(err.response.data.error ==='Current password is not correct'){
            document.querySelector('#pass_cur').innerHTML = `${err.response.data.error}`;
        }
    }
 console.log(err);
}

}