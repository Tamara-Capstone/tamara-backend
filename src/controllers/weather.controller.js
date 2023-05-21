const { weatherValidation } = require('../validations/wheater.validation')
const weatherServices = require('../services/weather.service')

const getWeather = async (req, res) => {
  const { lat, lon, search } = req.query

  try {
    /* Dapatkan data cuaca berdasarkan "keyword" */
    if (search) {
      const data = await weatherServices.getWeatherByKeyword(search)
      if (!data.length > 0) {
        return res.status(404).json({ error: `Data with keyword ${search} is not found` })
      }
      return res.status(200).json({ message: `Success to get wheater with keyword ${search}`, data })
    }

    /* Dapatkan cuaca berdasarkan lat dan lon dari gps */
    if (lat && lon) {
      const { value, error } = weatherValidation({ lat, lon })
      if (error) return res.status(422).json({ error: error.details[0].message })

      const data = await weatherServices.getWeatherByLocation(value.lat, value.lon)
      if (!data) return res.status(404).json({ error: 'Data not found, please check your body request' })
      return res.status(200).json({ message: 'Success to get wheater from location', data })
    }

    res.status(404).json({ message: 'Query params is not found' })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getWeatherDetail = async (req, res) => {
  const { weatherId } = req.params
  try {
    const data = await weatherServices.getWeatherById(weatherId)
    if (!data) return res.status(404).json({ error: 'Data not found, please check your body request' })
    res.status(200).json({ message: `Success to get wheater data with ID: ${weatherId}`, data })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = { getWeather, getWeatherDetail }
