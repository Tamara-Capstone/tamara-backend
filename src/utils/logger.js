const moment = require('moment')

const logger = (req, res, next) => {
  console.log(`[${moment().format()}]: ${req.method} ${req.path}`)
  next()
}

module.exports = logger
