const { ImgUpload } = require('../middlewares/storage')
const recommendationServices = require('../services/recommendation.service')
const { recommendationValidation } = require('../validations/recommendation.validation')

const getRecommendations = async (req, res) => {
  const { search } = req.query
  try {
    if (search) {
      const data = await recommendationServices.searchRecommendationByKeyword(search)
      if (!data.length > 0) return res.status(404).json({ error: `Recommendation with keyword ${search} is not found` })
      return res.status(200).json({ message: `Success to get data with keyword ${search}`, data })
    }
    const data = await recommendationServices.getAllRecommendation()
    res.status(200).json({ message: 'Success to get all recommendations', data })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getRecommendation = async (req, res) => {
  const { recommendationId } = req.params
  try {
    const data = await recommendationServices.getRecommendationById(recommendationId)
    if (!data) return res.status(404).json({ error: `Recommendation with ID ${recommendationId} is not found` })
    res.status(200).json({ message: `Success to get recommendations with ID ${recommendationId}`, data })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const createRecommendation = async (req, res) => {
  // check file sudah di upload ke storage
  let picture = []
  if (req.files) {
    picture = req.files.map((file) => file.cloudStoragePublicUrl)
  }

  const { value, error } = recommendationValidation({ ...req.body, images: picture })
  if (error) return res.status(422).json({ error: error.details[0].message })

  try {
    const data = await recommendationServices.addRecommendation(value)
    res.status(200).json({ message: 'Success to add new recommendation', data })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const deleteRecommendation = async (req, res) => {
  const { recommendationId } = req.params
  try {
    const data = await recommendationServices.getRecommendationById(recommendationId)
    if (!data) return res.status(404).json({ error: `Recommendation with ID ${recommendationId} is not found` })

    // Deleting images
    await Promise.all(
      data.images.map(async (imageUrl) => {
        return await ImgUpload.delete(imageUrl.image)
      })
    )

    await recommendationServices.deleteRecommendationById(recommendationId)
    await recommendationServices.deleteRecommendationImages(recommendationId)
    res.status(200).json({ message: `Success to delete recommendation with ID ${recommendationId}` })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = {
  getRecommendations,
  getRecommendation,
  createRecommendation,
  deleteRecommendation
}
