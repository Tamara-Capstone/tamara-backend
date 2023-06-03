// Mango_sooty_mold_disease
const { predictValidation } = require('../validations/predict.validation')
const predictServices = require('../services/predict.service')

const predictPicture = async (req, res) => {
  const { userId, body } = req
  const { error, value } = predictValidation(body)
  if (error) return res.status(422).json({ error: error.details[0].message })
  if (!req.file) return res.status(422).json({ error: 'Image is required' })

  if (!predictServices.isAllowedFruit(value.fruit_name)) {
    return res.status(422).json({ error: `${value.fruit_name} is not allowed` })
  }

  try {
    const { data } = await predictServices.predictToML(req.file, value.fruit_name)
    const recommendation = await predictServices.getRecommendation(data.label, value.fruit_name)
    await predictServices.addPredict({ userId, recommendationId: recommendation[0].id })
    predictServices.deleteImagePredict(req.file.filename)
    res.status(200).json({ message: 'Success to predict', data: recommendation })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getPredicts = async (req, res) => {
  const { userId } = req

  try {
    const data = await predictServices.getPredictsByUserId(userId)
    res.status(200).json({ message: 'Success to get your predict', data })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = { predictPicture, getPredicts }
