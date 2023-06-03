const validations = require('../validations/question.validation')
const QuestionServices = require('../services/question.service')
const { ImgUpload } = require('../middlewares/storage')

const getQuestions = async (req, res) => {
  const { search } = req.query
  try {
    // get question by keyword
    if (search) {
      const question = await QuestionServices.searchQuestionByKeyword(search)
      if (!question.length > 0) return res.status(200).json({ error: `Question with keyword ${search} is not found` })
      return res.status(200).json({ message: `Success to get questions with keyword ${search}`, data: question })
    }

    // get all questions
    const questions = await QuestionServices.getAllQuestions()
    res.status(200).json({ message: 'Success to get all questions', data: questions })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const getQuestion = async (req, res) => {
  const { questionId } = req.params
  try {
    const question = await QuestionServices.getQuestionById(questionId)
    if (!question) return res.status(200).json({ error: `Question with ID ${questionId} is not found` })
    res.status(200).json({ message: `Success to get question with ID ${question.id}`, data: question })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const createQuestion = async (req, res) => {
  const { userId, body } = req
  let picture = ''

  // check file sudah di upload ke storage
  if (req.file && req.file.cloudStoragePublicUrl) {
    picture = req.file.cloudStoragePublicUrl
  }

  const { value, error } = validations.createQuestionValidation({ picture, ...body })
  if (error) return res.status(422).json({ error: error.details[0].message })

  try {
    const payload = { userId, ...value }
    await QuestionServices.addQuestion(payload)
    res.status(200).json({ message: 'Success to create new question' })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const updateQuestion = async (req, res) => {
  const { userId, body } = req
  const { questionId } = req.params
  let picture = ''

  // check file sudah di upload ke storage
  if (req.file && req.file.cloudStoragePublicUrl) {
    picture = req.file.cloudStoragePublicUrl
  }

  const { value, error } = validations.updateQuestionValidation({ picture, ...body })
  if (error) return res.status(422).json({ error: error.details[0].message })

  try {
    const question = await QuestionServices.getUserLoginQuestion(questionId, userId)
    if (!question.length > 0) {
      return res.status(404).json({ error: `User do not have an question with id: ${questionId}` })
    }

    if (!value.picture) delete value.picture // delete picture on value if nothing
    await QuestionServices.updateQuestionById(questionId, value)
    res.status(200).json({ message: 'Success to update question' })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const deleteQuestion = async (req, res) => {
  const { userId } = req
  const { questionId } = req.params

  try {
    const question = await QuestionServices.getUserLoginQuestion(questionId, userId)
    if (!question.length > 0) {
      return res.status(404).json({ error: `User do not have an question with id: ${questionId}` })
    }

    // delete all answer and picture from question that want to delete
    if (question[0].picture) await ImgUpload.delete(question[0].picture)
    await QuestionServices.deleteAnswerByQuestionId(questionId)
    await QuestionServices.deleteQuestionById(questionId)

    res.status(200).json({ message: 'Success to delete question' })
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
