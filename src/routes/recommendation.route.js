const express = require('express')
const { ImgUpload } = require('../middlewares/storage')
const { uploadStorage } = require('../middlewares/multer')
const recommendationController = require('../controllers/recommendation.controller')

const recommendationRoute = express.Router()

recommendationRoute.get('/', recommendationController.getRecommendations)
recommendationRoute.post(
  '/',
  uploadStorage.single('image'),
  ImgUpload.uploadToGcs,
  recommendationController.createRecommendation
)
recommendationRoute.delete('/:recommendationId', recommendationController.deleteRecommendation)

module.exports = recommendationRoute
