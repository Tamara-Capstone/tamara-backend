const fs = require('fs')
const path = require('path')
const axios = require('axios')
const FormData = require('form-data')
const CONFIG = require('../config/environtment')
const Predict = require('../models/predict.model')
const Recommendation = require('../models/recommendation.model')

const isAllowedFruit = (fruit) => {
  const existingFruit = CONFIG.fruits.split(', ')
  return existingFruit.includes(fruit)
}

const predictToML = async (file, fruitName) => {
  const filePath = file.path
  const formData = new FormData()
  formData.append('file', fs.createReadStream(filePath))
  return await axios.post(`${CONFIG.machineLearningUrl}/predict/${fruitName}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

const deleteImagePredict = (filePath) => {
  fs.unlinkSync(path.join(__dirname, '../../uploads', filePath))
}

const addPredict = async (payload) => {
  return await Predict.create(payload)
}

const getPredictsByUserId = async (userId) => {
  return await Predict.find({ userId }).populate('recommendation')
}

const getRecommendation = async (label, plantName) => {
  return await Recommendation.findOne({ label, tanaman: plantName })
}

module.exports = {
  isAllowedFruit,
  predictToML,
  addPredict,
  getPredictsByUserId,
  getRecommendation,
  deleteImagePredict
}
