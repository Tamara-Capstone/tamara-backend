const Joi = require('joi')

const productionValidation = (payload) => {
  const schema = Joi.object().keys({
    jenis_tanaman: Joi.string().required(),
    luas_lahan: Joi.number().required(),
    hasil_panen: Joi.number().required(),
    harga_pasaran: Joi.number().required(),
    biaya: {
      sewa_lahan: Joi.number().required(),
      benih: Joi.number().required(),
      peralatan_pertanian: Joi.number().required(),
      pemupukan: Joi.number().required(),
      obat_pertanian: Joi.number().required(),
      transportasi: Joi.number().required(),
      kemasan_hasil_panen: Joi.number().required(),
      upah_kerja: Joi.number().required(),
      lain: Joi.number().required()
    }
  })
  return schema.validate(payload)
}

module.exports = { productionValidation }
