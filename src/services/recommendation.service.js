const db = require('../utils/db')

const getAllRecommendation = async () => {
  return await db.recommendation.findMany({
    include: {
      images: true
    }
  })
}

const getRecommendationById = async (recommendationId) => {
  return await db.recommendation.findUnique({
    where: { id: recommendationId },
    include: { images: true }
  })
}

const searchRecommendationByKeyword = async (keyword) => {
  return await db.recommendation.findMany({
    where: {
      OR: [
        {
          fruit_name: {
            contains: keyword
          }
        },
        {
          class: {
            contains: keyword
          }
        },
        {
          recommendation: {
            contains: keyword
          }
        },
        {
          characteristics: {
            contains: keyword
          }
        }
      ]
    }
  })
}

const addRecommendation = async (fields) => {
  return await db.recommendation.create({
    data: {
      ...fields,
      images: {
        create: fields.images.map((url) => ({ image: url }))
      }
    },
    include: { images: true }
  })
}

const deleteRecommendationById = async (recommendationId) => {
  return await db.recommendation.delete({ where: { id: recommendationId } })
}

const deleteRecommendationImages = async (recommendationId) => {
  return await db.ImageRecommendation.deleteMany({ where: { recommendationId } })
}

module.exports = {
  getAllRecommendation,
  getRecommendationById,
  searchRecommendationByKeyword,
  addRecommendation,
  deleteRecommendationById,
  deleteRecommendationImages
}
