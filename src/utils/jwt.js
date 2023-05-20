const jwt = require('jsonwebtoken')
const CONFIG = require('../config/environtment')

const signJWT = (payload, options) => {
  return jwt.sign(payload, CONFIG.accessTokenSecret, { ...options })
}

const verifyJWT = (token) => {
  return jwt.verify(token, CONFIG.accessTokenSecret, (err, decoded) => {
    if (err) {
      return { valid: false, expired: 'forbidden', decoded: null }
    }
    return { valid: true, expired: false, decoded }
  })
}

module.exports = { signJWT, verifyJWT }
