const authValidations = require('../validations/auth.validation')
const authServices = require('../services/auth.service')
const { signJWT } = require('../utils/jwt')

const register = async (req, res) => {
  const { value, error } = authValidations.registerValidation(req.body)
  if (error) return res.status(422).json({ error: error.details[0].message })

  try {
    const isUserExist = await authServices.findUserByEmail(value.email)
    if (isUserExist) return res.status(402).json({ error: 'Email has been registered' })

    value.password = authServices.hashing(value.password)
    await authServices.addUser(value)
    res.status(201).json({ message: 'Account has been successfully created' })
  } catch (error) {
    res.status(400).json({ error })
  }
}

const login = async (req, res) => {
  const { value, error } = authValidations.loginValidation(req.body)
  if (error) return res.status(422).json({ error: error.details[0].message })

  try {
    // Check user email is correct
    const user = await authServices.findUserByEmail(value.email)
    if (!user) return res.status(401).json({ error: 'Email is incorrect' })

    // Check user password is valid
    const isValidPassword = authServices.checkPassword(value.password, user.password)
    if (!isValidPassword) return res.status(401).json({ error: 'Password is incorrect' })

    const { password, ...others } = user
    const accessToken = signJWT(others)
    res.status(200).json({ message: `${user.fullname} has been login successfully`, accessToken })
  } catch (error) {
    res.status(400).json({ error })
  }
}

module.exports = { register, login }
