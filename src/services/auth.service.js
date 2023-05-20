const bcrypt = require('bcryptjs')

const db = require('../utils/db')

const hashing = (password) => {
  return bcrypt.hashSync(password, 10)
}

const checkPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword)
}

const findUserByEmail = async (email) => {
  return await db.user.findUnique({ where: { email } })
}

const addUser = async (payload) => {
  return await db.user.create({ data: payload })
}

module.exports = { hashing, checkPassword, findUserByEmail, addUser }
