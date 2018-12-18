const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/config');


//routers
const accountRouter = require('./routes/accountRouter');
const postRouter = require('./routes/postRouter');
const followRouter = require('./routes/followRouter');
const feedRouter = require('./routes/feedRouter');


//mongodb
mongoose.connect(config.MONGO_URI,{useNewUrlParser:true});
const db = mongoose.connection;
db.on('connected',()=>{console.log('connected to mongodb')});


const app = express();


//middlewares 
app.use(bodyParser.json());



app.use('/api/follow',followRouter);
app.use('/api/account',accountRouter);
app.use('/api/post',postRouter);
app.use('/api/feed',feedRouter);


app.listen(config.PORT,()=>console.log(`server listening on port ${config.PORT}`));