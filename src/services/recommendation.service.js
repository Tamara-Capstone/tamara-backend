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
      { buah: { $regex: keyword, $options: 'i' } },
      { label: { $regex: keyword, $options: 'i' } },
      { penyakit: { $regex: keyword, $options: 'i' } },
      { penyebab: { $regex: keyword, $options: 'i' } },
      { gejala: { $regex: keyword, $options: 'i' } },
      { rekomendasi: { $regex: keyword, $options: 'i' } }
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
