module.exports = class Apperr extends Error{
constructor(message,statusCode){
super();
this.message = message;
this.statusCode = statusCode;
this.status = this.statusCode =='404' ? 'Fail':'error'; 
}
}
