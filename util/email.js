const nodemailer = require('nodemailer');

// email feature is only for development, note working in production 

module.exports = (template,subject,message,to)=>{

    
var transporter = nodemailer.createTransport({
    
  host:'smtp.mailtrap.io' ,
  port:2525,
    auth: {
      user: '841663b502a5a2',
      pass: 'f2f8b813c7fd35'
    }
  });
  
  var mailOptions = {
    from: 'noteit@gmail.com',
    to,
    subject,
    text:message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      return `Reset password link send to ${to}`;
    }
  });



} 