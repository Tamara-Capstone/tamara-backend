const { weatherValidation } = require('../validations/wheater.validation')
const weatherServices = require('../services/weather.service')

const logger = require('../utils/logger')
const responseMsg = require('../utils/responseMsg')

const getWeather = async (req, res) => {
  let message = ''
  try {
    /* Dapatkan data cuaca berdasarkan "keyword" */
    if (req.query.search) {
      const data = await weatherServices.getWeatherByKeyword(req.query.search)
      if (!data.length > 0) {
        message = `Data with keyword ${req.query.search} is not found`
        logger.error(responseMsg(req, 'weather', message))
        return res.status(404).json({ error: message })
      }

      message = `Success to get wheater with keyword ${req.query.search}`
      logger.info(responseMsg(req, 'weather', message))
      return res.status(200).json({ message, data })
    }

    /* Dapatkan cuaca berdasarkan lat dan lon dari gps */
    if (req.query.lat && req.query.lon) {
      const { value, error } = weatherValidation(req.query)
      if (error) {
        message = error.details[0].message
        logger.error(responseMsg(req, 'weather', message))
        return res.status(422).json({ error: message })
      }

      const data = await weatherServices.getWeatherByLocation(value.lat, value.lon)
      if (!data) {
        message = 'Data not found, please check your body request'
        logger.error(responseMsg(req, 'weather', message))
        return res.status(404).json({ error: message })
      }

      message = 'Success to get wheater from location'
      logger.info(responseMsg(req, 'weather', message))
      return res.status(200).json({ message, data })
    }

    message = 'Query params is not found'
    logger.info(responseMsg(req, 'weather', message))
    return res.status(404).json({ message })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getWeatherDetail = async (req, res) => {
  const { weatherId } = req.params
  let message = ''

  try {
    const data = await weatherServices.getWeatherById(weatherId)
    if (!data) {
      message = 'Data not found, please check your body request'
      logger.error(responseMsg(req, 'weather', message))
      return res.status(404).json({ error: message })
    }

    message = `Success to get wheater data with ID: ${weatherId}`
    logger.info(responseMsg(req, 'weather', message))
    res.status(200).json({ message, data })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = { getWeather, getWeatherDetail }
