const validations = require('../validations/question.validation')
const QuestionServices = require('../services/question.service')
const gcpStorage = require('../middlewares/storage')
const responseMsg = require('../utils/responseMsg')
const logger = require('../utils/logger')

const getQuestions = async (req, res) => {
  const { search } = req.query
  let message = ''

  try {
    if (search) {
      const question = await QuestionServices.searchQuestionByKeyword(search)
      if (!question.length > 0) {
        message = `Question with keyword ${search} is not found`
        logger.error(responseMsg(req, 'questions', message))
        return res.status(200).json({ error: message })
      }

      message = `Success to get questions with keyword ${search}`
      logger.info(responseMsg(req, 'questions', message))
      return res.status(200).json({ message, data: question })
    }

    const questions = await QuestionServices.getAllQuestions()
    message = 'Success to get all questions'
    logger.info(responseMsg(req, 'questions', message))
    res.status(200).json({ message, data: questions })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getQuestion = async (req, res) => {
  const { questionId } = req.params
  let message = ''

  try {
    const question = await QuestionServices.getQuestionById(questionId)
    if (!question) {
      message = `Question with ID ${questionId} is not found`
      logger.error(responseMsg(req, 'questions', message))
      return res.status(200).json({ error: message })
    }

    message = `Success to get question with ID ${question.id}`
    logger.info(responseMsg(req, 'questions', message))
    res.status(200).json({ message, data: question })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const createQuestion = async (req, res) => {
  const { userId, body } = req
  let picture = ''
  let message = ''

  // check file sudah di upload ke storage
  if (req.file && req.file.cloudStoragePublicUrl) {
    picture = req.file.cloudStoragePublicUrl
  }

  const { value, error } = validations.createQuestionValidation({ picture, ...body })
  if (error) {
    message = error.details[0].message
    logger.error(responseMsg(req, 'questions', message))
    return res.status(422).json({ error: message })
  }

  try {
    const payload = { userId, ...value }
    await QuestionServices.addQuestion(payload)

    const message = 'Success to create new question'
    logger.info(responseMsg(req, 'questions', message))
    res.status(200).json({ message })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const updateQuestion = async (req, res) => {
  const { userId, body } = req
  const { questionId } = req.params

  let picture = ''
  let message = ''

  // check file sudah di upload ke storage
  if (req.file && req.file.cloudStoragePublicUrl) {
    picture = req.file.cloudStoragePublicUrl
  }

  const { value, error } = validations.updateQuestionValidation({ picture, ...body })
  if (error) {
    message = error.details[0].message
    logger.error(responseMsg(req, 'questions', message))
    return res.status(422).json({ error: message })
  }

  try {
    const question = await QuestionServices.getUserLoginQuestion(questionId, userId)
    if (!question.length > 0) {
      message = `Question with ID: ${questionId} and userId: ${userId} is not found`
      logger.error(responseMsg(req, 'questions', message))
      return res.status(404).json({ error: message })
    }

    if (!value.picture) delete value.picture
    await QuestionServices.updateQuestionById(questionId, value)

    message = 'Success to update question'
    logger.info(responseMsg(req, 'questions', message))
    res.status(200).json({ message })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const deleteQuestion = async (req, res) => {
  const { userId } = req
  const { questionId } = req.params
  let message = ''

  try {
    const question = await QuestionServices.getUserLoginQuestion(questionId, userId)
    if (!question.length > 0) {
      message = `Question with ID: ${questionId} and userId: ${userId} is not found`
      logger.error(responseMsg(req, 'questions', message))
      return res.status(404).json({ error: message })
    }

    if (question[0].picture) {
      const result = await gcpStorage.delete(question[0].picture)
      logger.info(responseMsg(req, 'questions', result))
    }

    logger.info(responseMsg(req, 'questions', question[0].picture))

    await QuestionServices.deleteAnswerByQuestionId(questionId)
    await QuestionServices.deleteQuestionById(questionId)

    message = 'Success to delete question'
    logger.info(responseMsg(req, 'questions', message))
    res.status(200).json({ message })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion
}
