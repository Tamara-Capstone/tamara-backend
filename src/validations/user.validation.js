const Joi = require('joi')

const userValidation = (payload) => {
  const schema = Joi.object({
    fullname: Joi.string().required(),
    photo: Joi.string().allow('', null)
  })
  return schema.validate(payload)
}

module.exports = { userValidation }
