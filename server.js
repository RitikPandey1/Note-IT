const mongoose = require('mongoose');
const dotenv = require('dotenv');
const delete_note = require('./util/delete_note');
const app = require('./app');

dotenv.config({path:'./config.env'});



mongoose.connect(process.env.DB,{
    useNewUrlParser : true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})
.then(()=> console.log('DataBase connected!') )
.catch(err=>console.log(err));

setInterval(delete_note,3600000);


app.listen(process.env.PORT,()=>console.log('Server Running port:',process.env.PORT));



