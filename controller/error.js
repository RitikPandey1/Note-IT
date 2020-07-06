const Apperr = require("../util/Apperr");

const cust_mongo_err = (error)=>{
    if(error.code===11000){
        if(error.keyPattern.name) return error = new Apperr('Username already taken',400);
        else if(error.keyPattern.email) return error = new Apperr('This email is already signup',400);  
}   
   return error;
}

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || '500';

//console.log(err);

if(process.env.NODE_ENV==='development'){
    let error = {...err};
    console.log(err);

    cust_mongo_err(error);

 res.status(error.statusCode).json({
    status:error.status,
    error: error.message,
    error_stack : error.stack,
    err
    });  
}


if(process.env.NODE_ENV==='production'){
   let error = {...err};
   console.log(err);
   
   error =  cust_mongo_err(error);

   if(error.statusCode=='500') {
     return res.send('Somthing went wrong ,Try again later');
    }
   
    res.status(error.statusCode).json({
    status:error.status,
    error: error.message,
});

}    
   

}