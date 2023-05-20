const Joi = require('joi')

const registerValidation = (payload) => {
  const schema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  })
  return schema.validate(payload)
}

const loginValidation = (payload) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
  return schema.validate(payload)
}

module.exports = { registerValidation, loginValidation }
