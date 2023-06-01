const db = require('../utils/db')

const getAllRecommendation = async () => {
  return await db.predict.findMany({
    include: {
      images: true
    }
  })
}

const getRecommendationById = async (recommendationId) => {
  return await db.predict.findUnique({
    where: { id: recommendationId },
    include: { images: true }
  })
}

const searchRecommendationByKeyword = async (keyword) => {
  return await db.predict.findMany({
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
  return await db.predict.create({
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
  return await db.predict.delete({ where: { id: recommendationId } })
}

module.exports = {
  getAllRecommendation,
  getRecommendationById,
  searchRecommendationByKeyword,
  addRecommendation,
  deleteRecommendationById
}
