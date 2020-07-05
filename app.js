const express = require('express');
const  cookie_parser= require('cookie-parser');

const note_router = require('./routes/note_route');
const user_router = require('./routes/user_route');
const view_routes = require('./routes/view_routes');
const error = require('./controller/error');



const app = express();


app.set('view engine','pug');
app.set('views','./view');

app.use(express.static('./public2'));


app.use(express.json());
app.use(cookie_parser());

app.use('/api/v1/notes',note_router);
app.use('/api/v1/user',user_router);
app.use('/',view_routes);

app.use('*',(req,res,next)=>{
    res.status(404).send('404 page not found on server');
})
// global error handling middleware
app.use(error);

module.exports = app;