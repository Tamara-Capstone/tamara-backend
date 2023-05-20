const analyzeService = require('../services/analyze.service')
const { productionValidation } = require('../validations/analyze.validation')

const logger = require('../utils/logger')
const responseMsg = require('../utils/responseMsg')

const createProduction = async (req, res) => {
  const { userId, body } = req
  let message = ''

  const { value, error } = productionValidation(body)
  if (error) {
    message = error.details[0].message
    logger.error(responseMsg(req, 'analyze', message))
    return res.status(422).json({ error: message })
  }

  const result = analyzeService.analyzeProduction(value)
  try {
    const data = await analyzeService.addProduction({ userId, ...result })
    message = 'Success to get analysis results'
    logger.info(responseMsg(req, 'analyze', message))
    res.status(200).json({ message, data })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getProduction = async (req, res) => {
  const { userId } = req
  try {
    const data = await analyzeService.getProductionUserLogin(userId)
    const message = `Success to get analysis with userId ${userId}`
    logger.info(responseMsg(req, 'analyze', message))
    res.status(200).json({ message, data })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = { createProduction, getProduction }
