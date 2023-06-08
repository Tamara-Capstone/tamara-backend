const AnswerService = require('../services/answer.service')
const validations = require('../validations/answer.validation')
const { getQuestionById } = require('../services/question.service')

const getAnswers = async (req, res) => {
  const { questionId } = req.params

  try {
    const question = await getQuestionById(questionId)
    if (!question) return res.status(422).json({ error: `Question with ID: ${questionId} is not found` })

    const answers = await AnswerService.getAnswerByQuestionId(question.id)
    res.status(200).json({
      message: `Success to get answers from question with ID: ${question.id}`,
      data: answers
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getAnswer = async (req, res) => {
  const { answerId } = req.params
  try {
    const answer = await AnswerService.getAnswerById(answerId)
    if (!answer) return res.status(422).json({ error: `Answer with ID: ${answerId} is not found` })
    res.status(200).json({ message: `Success to get answer with ID: ${answer.id}`, data: answer })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const createAnswer = async (req, res) => {
  const { userId, body } = req
  const { value, error } = validations.createAnswerValidation(body)
  if (error) return res.status(422).json({ error: error.details[0].message })

  try {
    const { questionId } = value
    const question = await getQuestionById(questionId)
    if (!question) return res.status(422).json({ error: `Question with ID: ${questionId} is not found` })

    const payload = { userId, ...value }
    await AnswerService.addAnswer(payload)
    res.status(200).json({ message: 'Success to create new answer' })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const updateAnswer = async (req, res) => {
  const { answerId } = req.params
  const { userId, body } = req

  const { value, error } = validations.updateAnswerValidation(body)
  if (error) return res.status(422).json({ error: error.details[0].message })

  try {
    const answer = await AnswerService.getUserLoginAnswer(answerId, userId)
    if (!answer) return res.status(404).json({ error: `User do not have an answer with id: ${answerId}` })

    await AnswerService.updateAnswerById(answerId, value)
    res.status(200).json({ message: 'Success to update answer' })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const deleteAnswer = async (req, res) => {
  const { answerId } = req.params
  const { userId } = req

  try {
    const answer = await AnswerService.getUserLoginAnswer(answerId, userId)
    if (!answer) return res.status(404).json({ error: `User do not have an answer with id: ${answerId}` })

    await AnswerService.deleteAnswerById(answerId)
    res.status(200).json({ message: 'Success to delete answer' })
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
