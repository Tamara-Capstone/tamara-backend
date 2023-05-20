const Joi = require('joi')

const createQuestionValidation = (payload) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    picture: Joi.string().required(),
    bestAnswerId: Joi.string().allow('', null)
  })
  return schema.validate(payload)
}

const updateQuestionValidation = (payload) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    picture: Joi.string().allow('', null),
    bestAnswerId: Joi.string().allow('', null)
  })
  return schema.validate(payload)
}

module.exports = { createQuestionValidation, updateQuestionValidation }
