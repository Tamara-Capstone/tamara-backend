const db = require('../utils/db')

const getUserById = async (id) => {
  return await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullname: true,
      email: true,
      photo: true
    }
  })
}

const updateUserById = async (id, payload) => {
  return await db.user.update({
    where: { id },
    data: payload
  })
}

module.exports = { getUserById, updateUserById }
