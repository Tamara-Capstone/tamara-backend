const fs = require('fs')
const path = require('path')
const axios = require('axios')
const db = require('../utils/db')
const FormData = require('form-data')
const CONFIG = require('../config/environtment')

const isAllowedFruit = (fruit) => {
  const existingFruit = ['cassava', 'chili', 'corn', 'guava', 'mango', 'potato', 'tea', 'tomato']
  return existingFruit.includes(fruit)
}

const predictToML = async (file, fruitName) => {
  const filePath = file.path
  const formData = new FormData()
  formData.append('file', fs.createReadStream(filePath))
  return await axios.post(`${CONFIG.machineLearningUrl}/${fruitName}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const deleteImagePredict = (filePath) => {
  fs.unlinkSync(path.join(__dirname, '../../uploads', filePath))
}

const addPredict = async (payload) => {
  return await db.predict.create({ data: payload })
}

const getPredictsByUserId = async (userId) => {
  return await db.predict.findMany({
    where: { userId },
    include: {
      Recommendation: {
        include: {
          images: true
        }
      }
    }
  })
}

const getRecommendation = async (label, fruitName) => {
  return await db.recommendation.findMany({
    where: {
      AND: {
        class: {
          equals: label
        },
        fruit_name: {
          equals: fruitName
        }
      }
    },
    include: {
      images: true
    }
  })
}

module.exports = {
  isAllowedFruit,
  predictToML,
  addPredict,
  getPredictsByUserId,
  getRecommendation,
  deleteImagePredict
}
