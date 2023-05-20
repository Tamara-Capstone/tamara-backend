const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const answerController = require('../controllers/answer.controller')

const answerRoute = express.Router()

answerRoute.get('/', verifyToken, answerController.getAnswers)
answerRoute.get('/:answerId', verifyToken, answerController.getAnswer)
answerRoute.post('/', verifyToken, answerController.createAnswer)
answerRoute.put('/:answerId', verifyToken, answerController.updateAnswer)
answerRoute.delete('/:answerId', verifyToken, answerController.deleteAnswer)

module.exports = answerRoute
