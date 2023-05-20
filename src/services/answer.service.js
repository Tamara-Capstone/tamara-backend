const db = require('../utils/db')

const selectQuery = {
  id: true,
  description: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      fullname: true,
      photo: true
    }
  }
}

const getAnswerByQuestionId = async (questionId) => {
  return await db.answer.findMany({
    where: { questionId },
    select: selectQuery,
    orderBy: {
      createdAt: 'desc'
    }
  })
}

const getAnswerById = async (id) => {
  return await db.answer.findUnique({
    where: { id },
    select: selectQuery
  })
}

const getUserLoginAnswer = async (answerId, userId) => {
  return await db.answer.findFirst({
    where: {
      id: answerId,
      userId
    }
  })
}

const addAnswer = async (payload) => {
  return await db.answer.create({ data: payload })
}

const updateAnswerById = async (answerId, payload) => {
  return await db.answer.update({
    where: {
      id: answerId
    },
    data: payload
  })
}

const deleteAnswerById = async (answerId) => {
  return await db.answer.delete({ where: { id: answerId } })
}

module.exports = {
  getAnswerByQuestionId,
  getAnswerById,
  getUserLoginAnswer,
  addAnswer,
  updateAnswerById,
  deleteAnswerById
}
