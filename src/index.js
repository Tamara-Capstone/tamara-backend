require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const routes = require('./routes')
const logger = require('./utils/logger')
const connectDB = require('./utils/connectDB')

connectDB()

const app = express()
const port = 5000 || process.env.PORT

app.use(express.json())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(logger)

routes(app)

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
  })
})

mongoose.connection.on('error', (error) => {
  const { no, code, syscall, hostname } = error
  console.log(`${no}: ${code}\t${syscall}\t${hostname}`)
})
