const pino = require('pino')
const moment = require('moment')
const pretty = require('pino-pretty')

const logger = pino(
  {
    base: {
      pid: false
    },
    timestamp: () => `, "time":"${moment().format()}"`
  },
  pretty()
)

module.exports = logger
