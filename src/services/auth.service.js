const bcrypt = require('bcryptjs')
const User = require('../models/user.model')

const hashing = (password) => {
  return bcrypt.hashSync(password, 10)
}

const checkPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword)
}

const findUserByEmail = async (email) => {
  return await User.findOne({ email })
}

const addUser = async (payload) => {
  return await User.create(payload)
}

module.exports = { hashing, checkPassword, findUserByEmail, addUser }
