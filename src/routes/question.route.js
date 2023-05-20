const express = require('express')
const upload = require('../middlewares/multer')
const verifyToken = require('../middlewares/verifyToken')
const ImgUpload = require('../middlewares/storage')
const questionController = require('../controllers/question.controller')

const questionRoute = express.Router()

questionRoute.get('/', verifyToken, questionController.getQuestions)
questionRoute.get('/:questionId', verifyToken, questionController.getQuestion)
questionRoute.post('/', verifyToken, upload.single('picture'), ImgUpload.uploadToGcs, questionController.createQuestion)
questionRoute.put(
  '/:questionId',
  verifyToken,
  upload.single('picture'),
  ImgUpload.uploadToGcs,
  questionController.updateQuestion
)
questionRoute.delete('/:questionId', verifyToken, questionController.deleteQuestion)

module.exports = questionRoute
