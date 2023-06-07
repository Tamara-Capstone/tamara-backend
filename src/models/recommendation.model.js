const mongoose = require('mongoose')

const recommendationSchema = new mongoose.Schema({
  tanaman: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  penyakit: {
    type: String,
    required: true
  },
  penyebab: {
    type: String,
    default: null
  },
  gejala: {
    type: String,
    required: true
  },
  rekomendasi: {
    type: [String],
    required: true
  },
  image: {
    type: String,
    require: true
  }
})

const Recommendation = mongoose.model('recommendation', recommendationSchema)
module.exports = Recommendation
