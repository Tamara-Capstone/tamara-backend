const mongoose = require('mongoose')

const recommendationSchema = new mongoose.Schema({
  fruit_name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  recommendation: {
    type: String,
    required: true
  },
  characteristics: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    require: true
  }
})

const Recommendation = mongoose.model('recommendation', recommendationSchema)
module.exports = Recommendation
