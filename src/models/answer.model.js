const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

answerSchema.virtual('user', {
  ref: 'user',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
})

const Answer = mongoose.model('answer', answerSchema)
module.exports = Answer
