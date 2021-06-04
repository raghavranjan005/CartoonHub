import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from './config.js';
import bodyParser from 'body-parser';


dotenv.config();

const mongodbUrl = config.MONGODB_URL;

const app = express();

app.use(bodyParser.json());

mongoose.connect(mongodbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true,

}).catch((error)=> console.log("hehe"));
  
app.listen(5000, () => {console.log("server started at http://localhost:5000")})