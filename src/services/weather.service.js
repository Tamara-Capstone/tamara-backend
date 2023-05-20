const axios = require('axios')
const CONFIG = require('../config/environtment')

const fetcher = axios.create({
  baseURL: CONFIG.weatherApiUrl
})

const getAllWeathers = async () => {
  const { data } = await fetcher.get('/wilayah.json')
  return data
}

const getWeatherByLocation = async (lat, lon) => {
  const weathers = await getAllWeathers()
  const result = weathers.filter((wheater) => parseFloat(wheater.lat) === lat && parseFloat(wheater.lon) === lon)
  const data = await getWeatherById(result[0].id)
  return data
}

const getWeatherByKeyword = async (keyword) => {
  const weathers = await getAllWeathers()
  return weathers.filter(
    (wheater) =>
      wheater.propinsi.toLowerCase().includes(keyword.toLowerCase()) ||
      wheater.kota.toLowerCase().includes(keyword.toLowerCase()) ||
      wheater.kecamatan.toLowerCase().includes(keyword.toLowerCase())
  )
}

const getWeatherById = async (weatherId) => {
  const { data } = await fetcher.get(`/${weatherId}.json`)
  return data
}

module.exports = { getWeatherByLocation, getWeatherByKeyword, getWeatherById }
