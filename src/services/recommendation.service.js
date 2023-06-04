const Recommendation = require('../models/recommendation.model')

const getAllRecommendation = async () => {
  return await Recommendation.find()
}

const getRecommendationById = async (recommendationId) => {
  return await Recommendation.findById(recommendationId)
}

const searchRecommendationByKeyword = async (keyword) => {
  return await Recommendation.find({
    $or: [
      { fruit_name: { $regex: keyword, $options: 'i' } },
      { class: { $regex: keyword, $options: 'i' } },
      { recommendation: { $regex: keyword, $options: 'i' } },
      { characteristics: { $regex: keyword, $options: 'i' } }
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
  getRecommendationById,
  searchRecommendationByKeyword,
  addRecommendation,
  deleteRecommendationById
}
