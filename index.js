require('dotenv').config()
const express=require('express');
const app=express();
const config=require('./Config/config');
const db=require('./Config/database');
const router = require('./Router/paintings');
const auth = require('./Router/user');

require('./Config/express')(app);
app.use('/', router);
app.use('/', auth);

app.listen(config.port,(err)=>{
    if(err){
        console.log('Server error FIX:',err);
        return;
    }
    db();
    console.log(`Server is listening on port ${config.port}`);
})