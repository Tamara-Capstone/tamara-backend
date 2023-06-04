const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    bestAnswerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'answer'
    }
  },
  { timestamps: true }
)

const Question = mongoose.model('question', questionSchema)
module.exports = Question
