const express = require('express')
const weatherController = require('../controllers/weather.controller')

const weatherRoute = express.Router()

weatherRoute.get('/', weatherController.getWeather)
weatherRoute.get('/detail', weatherController.getWeatherDetailByLocation)
weatherRoute.get('/detail/:weatherId', weatherController.getWeatherDetailById)

module.exports = weatherRoute
