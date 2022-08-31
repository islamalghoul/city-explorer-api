'use strict'
const express = require('express');
const server = express();
const cors = require('cors');
require('dotenv').config();
server.use(cors());
const axios = require('axios')
let weatherHandler=require('./Weather')
let moviesHandler=require('./Movies')
//https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2022-08-26&end_date=2022-08-27&key=a4026ab41f9c495790bd4e788d3087a1
const PORT = process.env.PORT;
server.get('/', (req, res) => {
    res.send("hello from home route")
})
//http://localhost:3100/weather?name=amman&lat=lat&lon=lon&key=a4026ab41f9c495790bd4e788d3087a1
server.get('/weather', weatherHandler)

//http://localhost:3100/movies?name=query&api_key=4cdf972d28239e8f8ad1b28527b46f03

server.get('/movies', moviesHandler)
server.listen(PORT, () => {
    console.log("server is running on port " + PORT)
})