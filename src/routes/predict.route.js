const express = require('express')
const upload = require('../middlewares/multer')
const ImgUpload = require('../middlewares/storage')
const verifyToken = require('../middlewares/verifyToken')
const { predictPicture } = require('../controllers/predict.controller')

const predictRoute = express.Router()

predictRoute.post('/', verifyToken, upload.single('picture'), ImgUpload.uploadToGcs, predictPicture)

module.exports = predictRoute
