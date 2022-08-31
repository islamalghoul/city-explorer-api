const axios = require('axios')
require('dotenv').config();
let WEATHER_API_KEY = process.env.key

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
class weather {
    constructor(ele) {
        this.description = ele.weather.description
        this.date = ele.datetime
    }
}
module.exports=weatherHandler ;