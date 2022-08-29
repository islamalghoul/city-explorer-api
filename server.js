const express = require('express');
const server = express();
const cors=require('cors')

const Data= require('./data.json');
server.use(cors());


const PORT=3100
server.get('/',(req,res)=>{

    res.send("hello from home route")
})

server.get('/hello',(req,res)=>{

    res.send("hello from route")
})
//  weather?name=cityname&lon=lon&lat=lat
server.get('/weather',(req,res)=>{
res.send(Data.find(ele=>{
        if(
            ele.city_name==req.query.name && 
            ele.lon==req.query.lon && 
            ele.lat==req.query.lat){

                // 
                return ele
        }
    }))
})
server.listen(PORT,()=>{
    console.log("hi from server")
})