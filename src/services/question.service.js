const db = require('../utils/db')

const selectQuery = {
  id: true,
  question: true,
  description: true,
  picture: true,
  category: true,
  bestAnswerId: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      fullname: true,
      photo: true
    }
  }
}

const getAllQuestions = async () => {
  return await db.question.findMany({
    select: {
      ...selectQuery,
      _count: {
        select: {
          Answer: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

const getQuestionById = async (id) => {
  return await db.question.findUnique({
    where: { id },
    select: selectQuery
  })
}

const getUserLoginQuestion = async (id, userId) => {
  return await db.question.findMany({ where: { id, userId } })
}

const addQuestion = async (payload) => {
  return await db.question.create({ data: payload })
}

const updateQuestionById = async (id, payload) => {
  return await db.question.update({
    where: { id },
    data: payload
  })
}

const deleteQuestionById = async (questionId) => {
  return await db.question.delete({ where: { id: questionId } })
}

const deleteAnswerByQuestionId = async (questionId) => {
  return await db.answer.deleteMany({ where: { questionId } })
}

const searchQuestionByKeyword = async (keyword) => {
  return await db.question.findMany({
    where: {
      OR: [
        {
          question: {
            contains: keyword
          }
        },
        {
          description: {
            contains: keyword
          }
        },
        {
          category: {
            contains: keyword
          }
        }
      ]
    }
  })
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
