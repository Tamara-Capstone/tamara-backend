const Joi = require('joi')

const weatherValidation = (payload) => {
  const schema = Joi.object({
    lat: Joi.number().required(),
    lon: Joi.number().required()
  })
  return schema.validate(payload)
}

module.exports = { weatherValidation }
