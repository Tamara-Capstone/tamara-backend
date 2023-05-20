const userServices = require('../services/user.service')
const { userValidation } = require('../validations/user.validation')

const logger = require('../utils/logger')
const responseMsg = require('../utils/responseMsg')

const getUser = async (req, res) => {
  let message = ''
  try {
    const user = await userServices.getUserById(req.userId)
    if (!user) {
      message = 'Data user not found'
      logger.error(responseMsg(req, 'users', message))
      return res.status(404).json({ error: message })
    }

    message = 'Success to get user data'
    logger.info(responseMsg(req, 'users', message))
    res.status(200).json({ message, data: user })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

const updateUser = async (req, res) => {
  const { userId, body } = req
  let photo = ''
  let message = ''

  if (req.file && req.file.cloudStoragePublicUrl) {
    photo = req.file.cloudStoragePublicUrl
  }

  const { value, error } = userValidation({ photo, ...body })
  if (error) {
    message = error.details[0].message
    logger.error(responseMsg(req, 'users', message))
    return res.status(400).json({ error: message })
  }

  try {
    const user = await userServices.getUserById(userId)
    if (!user) {
      message = `User with ID ${userId} is not found`
      logger.info(responseMsg(req, 'users', message))
      return res.status(404).json({ error: message })
    }

    if (!value.photo) delete value.picture
    await userServices.updateUserById(user.id, value)

    message = 'Success to change user data'
    logger.info(responseMsg(req, 'users', message))
    return res.status(200).json({ message })
  } catch (error) {
    return res.status(400).json({ error })
  }
}

module.exports = { getUser, updateUser }
