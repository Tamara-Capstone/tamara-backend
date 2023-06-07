const Question = require('../models/question.model')
const Answer = require('../models/answer.model')

const getAllQuestions = async () => {
  return await Question.find().populate('user', 'fullname email photo').sort({ createdAt: -1 })
}

const getQuestionById = async (id) => {
  return Question.findById(id).populate('user', 'fullname email photo')
}

const getUserLoginQuestion = async (id, userId) => {
  return await Question.findOne({ _id: id, userId })
}

const addQuestion = async (payload) => {
  return await Question.create(payload)
}

const updateQuestionById = async (id, payload) => {
  return await Question.findByIdAndUpdate(id, payload)
}

const deleteQuestionById = async (questionId) => {
  return await Question.findByIdAndDelete(questionId)
}

const deleteAnswerByQuestionId = async (questionId) => {
  return await Answer.deleteMany({ questionId })
}

const searchQuestionByKeyword = async (keyword) => {
  return await Question.find({
    $or: [
      { question: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } }
    ]
  })
    .populate('user', 'fullname email photo')
    .sort({ createdAt: -1 })
}

module.exports = {
  getAllQuestions,
  getQuestionById,
  getUserLoginQuestion,
  addQuestion,
  updateQuestionById,
  deleteQuestionById,
  deleteAnswerByQuestionId,
  searchQuestionByKeyword
}
