const Joi = require('joi')

const recommendationValidation = (payload) => {
  const schema = Joi.object({
    tanaman: Joi.string().required(),
    label: Joi.string().required(),
    penyakit: Joi.string().required(),
    hasil: Joi.any(),
    image: Joi.string().required()
  })
  return schema.validate(payload)
}

module.exports = { recommendationValidation }
