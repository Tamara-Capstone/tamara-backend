const express = require('express')
const { uploadLocal } = require('../middlewares/multer')
const verifyToken = require('../middlewares/verifyToken')
const predictController = require('../controllers/predict.controller')

const predictRoute = express.Router()

predictRoute.post('/', verifyToken, uploadLocal.single('images'), predictController.predictPicture)
predictRoute.get('/', verifyToken, predictController.getPredicts)

module.exports = predictRoute
