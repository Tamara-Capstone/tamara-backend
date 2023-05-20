const Joi = require('joi')

const createAnswerValidation = (payload) => {
  const schema = Joi.object({
    description: Joi.string().required(),
    questionId: Joi.string().required()
  })
  return schema.validate(payload)
}

const updateAnswerValidation = (payload) => {
  const schema = Joi.object({
    description: Joi.string().required()
  })
  return schema.validate(payload)
}

const getAnswersValidation = (payload) => {
  const schema = Joi.object({
    questionId: Joi.string().required()
  })
  return schema.validate(payload)
}

module.exports = {
  createAnswerValidation,
  getAnswersValidation,
  updateAnswerValidation
}
