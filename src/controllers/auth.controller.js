const authValidations = require('../validations/auth.validation')
const authServices = require('../services/auth.service')

const responseMsg = require('../utils/responseMsg')
const { signJWT } = require('../utils/jwt')
const logger = require('../utils/logger')

const register = async (req, res) => {
  let message = ''

  const { value, error } = authValidations.registerValidation(req.body)
  if (error) {
    message = error.details[0].message
    logger.error(responseMsg(req, 'auth', message))
    return res.status(422).json({ error: message })
  }

  try {
    const isUserExist = await authServices.findUserByEmail(value.email)
    if (isUserExist) {
      message = 'Email has been registered'
      logger.error(responseMsg(req, 'auth', message))
      return res.status(402).json({ error: message })
    }

    value.password = authServices.hashing(value.password)
    await authServices.addUser(value)

    message = 'Account has been successfully created'
    logger.info(responseMsg(req, 'auth', message))
    res.status(201).json({ message })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const login = async (req, res) => {
  let message = ''

  const { value, error } = authValidations.loginValidation(req.body)
  if (error) {
    message = error.details[0].message
    logger.error(responseMsg(req, 'auth', message))
    return res.status(422).json({ error: message })
  }

  try {
    const user = await authServices.findUserByEmail(value.email)
    if (!user) {
      message = 'Email is incorrect'
      logger.error(responseMsg(req, 'auth', message))
      return res.status(401).json({ error: message })
    }

    const isValidPassword = authServices.checkPassword(value.password, user.password)
    if (!isValidPassword) {
      message = 'Password is incorrect'
      logger.error(responseMsg(req, 'auth', message))
      return res.status(401).json({ error: message })
    }

    const { password, ...others } = user
    const accessToken = signJWT(others)

    message = `${user.fullname} has been login successfully`
    logger.info(responseMsg(req, 'auth', message))
    res.status(200).json({ message, accessToken })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = { register, login }
