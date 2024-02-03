require('dotenv').config();
const express = require('express');

const app = express();
const port =process.env.PORT || 3000;
app.get('/', (req,res)=>{
   res.send("welcome to home page");
});

app.get('/login',(req,res)=>{
res.send("welcome to login page");
});

app.listen(port,()=>{
    console.log(`Server is started at port ${port}`);
});