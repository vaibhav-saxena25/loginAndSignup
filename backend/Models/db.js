const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then((res)=>{
        console.log("monog db connected");
    })
    .catch((err)=>{
        console.log("mongo db error...");
    })