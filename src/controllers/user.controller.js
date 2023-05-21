const userServices = require('../services/user.service')
const { userValidation } = require('../validations/user.validation')

const getUser = async (req, res) => {
  try {
    const user = await userServices.getUserById(req.userId)
    if (!user) return res.status(404).json({ error: 'Data user not found' })
    res.status(200).json({ message: 'Success to get user data', data: user })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const updateUser = async (req, res) => {
  const { userId, body } = req
  let photo = ''

  if (req.file && req.file.cloudStoragePublicUrl) {
    photo = req.file.cloudStoragePublicUrl
  }

  const { value, error } = userValidation({ photo, ...body })
  if (error) return res.status(400).json({ error: error.details[0].message })

  try {
    const user = await userServices.getUserById(userId)
    if (!user) return res.status(404).json({ error: `User with ID ${userId} is not found` })

    if (!value.photo) delete value.picture
    await userServices.updateUserById(user.id, value)
    res.status(200).json({ message: 'Success to change user data' })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = { getUser, updateUser }
