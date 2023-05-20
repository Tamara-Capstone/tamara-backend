const express = require('express')
const weatherController = require('../controllers/weather.controller')

const weatherRoute = express.Router()

weatherRoute.get('/', weatherController.getWeather)
weatherRoute.get('/:weatherId', weatherController.getWeatherDetail)

module.exports = weatherRoute
