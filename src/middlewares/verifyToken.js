const logger = require('../utils/logger')
const { verifyJWT } = require('../utils/jwt')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer ')) {
    logger.error('unauthorized')
    return res.status(401).json({ message: 'unauthorized' })
  }

  const token = authHeader.split(' ')[1]
  const { valid, expired, decoded } = verifyJWT(token)
  if (expired && !valid) {
    logger.error(`${req.method}:${req.path}\tforbidden`)
    res.status(403).json({ message: 'forbidden' })
    next()
  }
  req.userId = decoded.id
  next()
}

module.exports = verifyToken
