const express = require('express')
const upload = require('../middlewares/multer')
const ImgUpload = require('../middlewares/storage')
const recommendationController = require('../controllers/recommendation.controller')

const recommendationRoute = express.Router()

recommendationRoute.get('/', recommendationController.getRecommendations)
recommendationRoute.get('/:recommendationId', recommendationController.getRecommendation)
recommendationRoute.post(
  '/',
  upload.array('images'),
  ImgUpload.uploadToGcs,
  recommendationController.createRecommendation
)
recommendationRoute.delete('/:recommendationId', recommendationController.deleteRecommendation)

module.exports = recommendationRoute
