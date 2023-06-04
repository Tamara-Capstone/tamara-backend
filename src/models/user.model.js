const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: false,
    default: ''
  }
})

const User = mongoose.model('user', userSchema)
module.exports = User
