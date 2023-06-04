const User = require('../models/user.model')

const getUserById = async (userId) => {
  return await User.findById(userId, { password: 0 })
}

const updateUserById = async (userId, payload) => {
  return await User.findByIdAndUpdate(userId, payload)
}

module.exports = { getUserById, updateUserById }
