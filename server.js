'use strict'
const express = require('express');
const server = express();
const cors = require('cors');
require('dotenv').config();
const Data = require('./data.json');
server.use(cors());
const axios = require('axios')
let WEATHER_API_KEY = process.env.key
let MOVIE_API_KEY = process.env.keyForMovies
//https://api.weatherbit.io/v2.0/history/daily?postal_code=27601&country=US&start_date=2022-08-26&end_date=2022-08-27&key=a4026ab41f9c495790bd4e788d3087a1
const PORT = process.env.PORT;

server.get('/', (req, res) => {

    res.send("hello from home route")
})


let weatherHandler = async (req, res) => {
    let name = req.query.name
    let lon = req.query.lon
    let lat = req.query.lat
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${name}&lon=${lon}&lat=${lat}&key=${WEATHER_API_KEY}`
    console.log(name, lon, lat)
    try {
        let result = await axios.get(url)
        let array = result.data.data.map(ele => {
            return new weather(ele)
        })
        res.send(array)
    }
    catch {

    }
}

//http://localhost:3100/weather?name=amman&lat=lat&lon=lon&key=a4026ab41f9c495790bd4e788d3087a1
server.get('/weather', weatherHandler)

class weather {
    constructor(ele) {
        this.description = ele.weather.description
        this.date = ele.datetime
    }
}
let moviesHandler = async (req, res) => {
    let name = req.query.name
   // let url = `https://api.themoviedb.org/3/movie/550?query=${name}&api_key=${MOVIE_API_KEY}`
   let url = `https://api.themoviedb.org/3/search/multi?api_key=${MOVIE_API_KEY}&&language=en-US&include_adult=false&page=1`
   url += " &query=" + name;
    console.log(url)
    let response = [];
    try {
        console.log("hello")
        //let result = await axios.get(url)
        //let arr = result.data
        await axios.get(url).then( result => {
            let data = result.data
            response =  data.results.map(ele => {
                return new movies(ele)
        })
        res.send(response);
        //response = arr.map(ele => {
         //   return new movies(ele)
        })

      
    }
    catch {

    }
   
}

//http://localhost:3100/movies?name=query&api_key=4cdf972d28239e8f8ad1b28527b46f03

server.get('/movies', moviesHandler)



class movies {
    constructor(ele) {
        this.title = ele.title
        this.overview = ele.overview
        this.vote_average = ele.vote_average
        this.image_url = ele.poster_path
        this.popularity = ele.popularity
        this.release_date = ele.release_date
    }
}


server.listen(PORT, () => {
    console.log("server is running on port " + PORT)
})