const { predictValidation } = require('../validations/predict.validation')
const predictServices = require('../services/predict.service')

const predictPicture = async (req, res) => {
  const { userId, body } = req
  const { error, value } = predictValidation(body)
  if (error) return res.status(422).json({ error: error.details[0].message })
  if (!req.file) return res.status(422).json({ error: 'Image is required' })

  const fruitName = value.fruit_name.toLowerCase()
  if (!predictServices.isAllowedFruit(fruitName)) {
    return res.status(422).json({ error: `${fruitName} is not allowed` })
  }

  try {
    const { data } = await predictServices.predictToML(req.file, fruitName)
    const recommendation = await predictServices.getRecommendation(data.label, fruitName)
    if (recommendation === null) return res.status(404).json({ error: 'Recommendation not found' })
    await predictServices.addPredict({ userId, recommendationId: recommendation.id })
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
