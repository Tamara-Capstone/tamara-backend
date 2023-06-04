const Answer = require('../models/answer.model')

const getAnswerByQuestionId = async (questionId) => {
  return await Answer.find({ questionId }).populate('userId', 'fullname email photo').sort({ createdAt: -1 })
}

const getAnswerById = async (id) => {
  return await Answer.findById(id).populate('userId', 'fullname email photo')
}

const getUserLoginAnswer = async (answerId, userId) => {
  return await Answer.findOne({ _id: answerId, userId })
}

const addAnswer = async (payload) => {
  return await Answer.create(payload)
}

const updateAnswerById = async (answerId, payload) => {
  return await Answer.findByIdAndUpdate(answerId, payload)
}

const deleteAnswerById = async (answerId) => {
  return await Answer.findByIdAndDelete(answerId)
}

module.exports = {
  getAnswerByQuestionId,
  getAnswerById,
  getUserLoginAnswer,
  addAnswer,
  updateAnswerById,
  deleteAnswerById
}
