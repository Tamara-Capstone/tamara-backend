const express = require('express')
const { ImgUpload } = require('../middlewares/storage')
const verifyToken = require('../middlewares/verifyToken')
const { uploadStorage } = require('../middlewares/multer')
const questionController = require('../controllers/question.controller')

const questionRoute = express.Router()

questionRoute.get('/', verifyToken, questionController.getQuestions)
questionRoute.get('/:questionId', verifyToken, questionController.getQuestion)
questionRoute.post(
  '/',
  verifyToken,
  uploadStorage.single('picture'),
  ImgUpload.uploadToGcs,
  questionController.createQuestion
)
questionRoute.put(
  '/:questionId',
  verifyToken,
  uploadStorage.single('picture'),
  ImgUpload.uploadToGcs,
  questionController.updateQuestion
)
questionRoute.delete('/:questionId', verifyToken, questionController.deleteQuestion)

module.exports = questionRoute
