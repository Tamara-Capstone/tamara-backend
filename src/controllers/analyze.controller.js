const analyzeService = require('../services/analyze.service')
const { productionValidation } = require('../validations/analyze.validation')

const createProduction = async (req, res) => {
  const { userId, body } = req
  const { value, error } = productionValidation(body)
  if (error) return res.status(422).json({ error: error.details[0].message })

  // analisis produksi dari req body
  const result = analyzeService.analyzeProduction(value)
  try {
    const data = await analyzeService.addProduction({ userId, ...result })
    res.status(200).json({ message: 'Success to get analysis results', data })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getProduction = async (req, res) => {
  const { userId } = req
  try {
    const data = await analyzeService.getProductionUserLogin(userId)
    res.status(200).json({ message: `Success to get analysis with userId ${userId}`, data })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = { createProduction, getProduction }
