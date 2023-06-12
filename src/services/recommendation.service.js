const Recommendation = require('../models/recommendation.model')

const getAllRecommendation = async () => {
  return await Recommendation.find()
}

const searchRecommendationByKeyword = async (keyword) => {
  return await Recommendation.find({
    $or: [
      { tanaman: { $regex: keyword, $options: 'i' } },
      { label: { $regex: keyword, $options: 'i' } },
      { penyakit: { $regex: keyword, $options: 'i' } }
    ]
  })
}

const addRecommendation = async (fields) => {
  return await Recommendation.create(fields)
}

const deleteRecommendationById = async (recommendationId) => {
  return await Recommendation.findByIdAndDelete(recommendationId)
}

module.exports = {
  getAllRecommendation,
  searchRecommendationByKeyword,
  addRecommendation,
  deleteRecommendationById
}
