/* Modules */
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const logger = require('./utils/logger')
const routes = require('./routes')

dotenv.config()
const app = express()
const port = 5000 || process.env.PORT

app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

routes(app)

app.listen(port, () => {
  logger.info(`Server is listening on http://localhost:${port}`)
})
