const Joi = require('joi')

const predictValidation = (payload) => {
  const schema = Joi.object({
    fruit_name: Joi.string().required(),
    images: Joi.any()
  })
  return schema.validate(payload)
}

module.exports = { predictValidation }
