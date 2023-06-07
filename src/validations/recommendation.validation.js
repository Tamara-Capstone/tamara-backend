const Joi = require('joi')

const recommendationValidation = (payload) => {
  const schema = Joi.object({
    tanaman: Joi.string().required(),
    label: Joi.string().required(),
    penyakit: Joi.string().required(),
    penyebab: Joi.string().required(),
    gejala: Joi.array().items(Joi.string()).required().min(1),
    rekomendasi: Joi.array().items(Joi.string()).required().min(1),
    image: Joi.string().required()
  })
  return schema.validate(payload)
}

module.exports = { recommendationValidation }
