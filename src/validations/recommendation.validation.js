const Joi = require('joi')

const recommendationValidation = (payload) => {
  const schema = Joi.object({
    fruit_name: Joi.string().required(),
    class: Joi.string().required(),
    recommendation: Joi.string().required(),
    characteristics: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required().min(1)
  })
  return schema.validate(payload)
}

module.exports = { recommendationValidation }
