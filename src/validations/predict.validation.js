const Joi = require('joi')

const predictValidation = (payload) => {
  const schema = Joi.object({
    plant_name: Joi.string().required(),
    image: Joi.any()
  })
  return schema.validate(payload)
}

module.exports = { predictValidation }
