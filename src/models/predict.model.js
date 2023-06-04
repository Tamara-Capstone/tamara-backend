const mongoose = require('mongoose')

const predictSchema = new mongoose.Schema(
  {
    recommendationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'recommendation',
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
)

const Predict = mongoose.model('predict', predictSchema)
module.exports = Predict
