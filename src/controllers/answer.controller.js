const AnswerService = require('../services/answer.service')
const validations = require('../validations/answer.validation')
const { getQuestionById } = require('../services/question.service')

const logger = require('../utils/logger')
const responseMsg = require('../utils/responseMsg')

const getAnswers = async (req, res) => {
  let message = ''
  const { value, error } = validations.getAnswersValidation(req.body)
  if (error) {
    message = error.details[0].message
    logger.error(responseMsg(req, 'answers', message))
    return res.status(422).json({ error: message })
  }

  try {
    const question = await getQuestionById(value.questionId)
    if (!question) {
      message = `Question with ID: ${value.questionId} is not found`
      logger.error(responseMsg(req, 'answers', message))
      return res.status(422).json({ error: message })
    }

    const answers = await AnswerService.getAnswerByQuestionId(question.id)
    message = `Success to get answers from question with ID: ${question.id}`
    logger.info(responseMsg(req, 'answers', message))
    res.status(200).json({ message, data: answers })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getAnswer = async (req, res) => {
  const { answerId } = req.params
  let message = ''

  try {
    const answer = await AnswerService.getAnswerById(answerId)
    if (!answer) {
      message = `Answer with ID: ${answerId} is not found`
      logger.error(responseMsg(req, 'answers', message))
      return res.status(422).json({ error: message })
    }

    message = `Success to get answer with ID: ${answer.id}`
    logger.info(responseMsg(req, 'answers', message))
    res.status(200).json({ message, data: answer })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const createAnswer = async (req, res) => {
  let message = ''

  const { value, error } = validations.createAnswerValidation(req.body)
  if (error) {
    message = error.details[0].message
    logger.error(responseMsg(req, 'answers', message))
    return res.status(422).json({ error: message })
  }

  try {
    const question = await getQuestionById(value.questionId)
    if (!question) {
      message = `Question with ID: ${value.questionId} is not found`
      logger.error(responseMsg(req, 'answers', message))
      return res.status(422).json({ error: message })
    }

    const payload = { userId: req.userId, ...value }
    await AnswerService.addAnswer(payload)

    message = 'Success to create new answer'
    logger.info(responseMsg(req, 'answers', message))
    res.status(200).json({ message })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const updateAnswer = async (req, res) => {
  const { answerId } = req.params
  const { userId, body } = req
  let message = ''

  const { value, error } = validations.updateAnswerValidation(body)
  if (error) {
    message = error.details[0].message
    logger.error(responseMsg(req, 'answers', message))
    return res.status(422).json({ error: message })
  }

  try {
    const answer = await AnswerService.getUserLoginAnswer(answerId, userId)
    if (!answer) {
      message = `Answer with ID: ${answerId} and userId: ${userId} is not found`
      logger.error(responseMsg(req, 'answers', message))
      return res.status(404).json({ error: message })
    }

    await AnswerService.updateAnswerById(answerId, value)
    message = 'Success to update answer'
    logger.info(responseMsg(req, 'answers', message))
    res.status(200).json({ message })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const deleteAnswer = async (req, res) => {
  const { answerId } = req.params
  const { userId } = req
  let message = ''

  try {
    const answer = await AnswerService.getUserLoginAnswer(answerId, userId)
    if (!answer) {
      message = `Answer with ID: ${answerId} and userId: ${userId} is not found`
      logger.error(responseMsg(req, 'answers', message))
      return res.status(404).json({ error: message })
    }

    await AnswerService.deleteAnswerById(answerId)
    message = 'Success to delete answer'
    logger.info(responseMsg(req, 'answers', message))
    res.status(200).json({ message })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = {
  getAnswers,
  getAnswer,
  createAnswer,
  updateAnswer,
  deleteAnswer
}
