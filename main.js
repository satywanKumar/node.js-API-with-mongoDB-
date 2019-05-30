const express = require('express');
const app = express();
const morgan = require('morgan');
const studentRouter = require('./router/student');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Student = require('./models/studentModel')


mongoose.connect(
    'mongodb+srv://sbs:sbs@sbs-gpk49.mongodb.net/test?retryWrites=true',
{
    useMongoClient:true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student',studentRouter);





//error handling 
app.use((req,res,next)=>{
    const error = new Error('not found');
    error.status = 400;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    });
});

app.listen(3000,()=>{console.log('apps are running on localhost 3000')});