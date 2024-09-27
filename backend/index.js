const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter')   
const ProductRouter = require('./routes/ProductRouter')

require('dotenv').config();
require('./Models/db');

const PORT = process.env.PORT||5000

app.get("/ping",(req,res)=>{
    res.send("pong");
})

app.use(cors());
app.use(bodyParser.json());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);


app.listen(PORT,()=>{
    console.log(`server is runnint on the port ${PORT}`);
})

//JJideLYveSPKDBNd