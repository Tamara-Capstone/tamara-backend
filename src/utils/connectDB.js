const mongoose = require('mongoose')
const CONFIG = require('../config/environtment')

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(`${CONFIG.db}`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB
