const axios = require('axios')
require('dotenv').config();
let MOVIE_API_KEY = process.env.keyForMovies
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

module.exports=moviesHandler