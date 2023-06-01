// require('@google-cloud/debug-agent').start()
/* Modules */
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const routes = require('./routes')
const logger = require('./utils/logger')

dotenv.config()
const app = express()
const port = 5000 || process.env.PORT

app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(logger)

routes(app)

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
