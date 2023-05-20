const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const analyzeController = require('../controllers/analyze.controller')

const analyzeRoute = express.Router()

analyzeRoute.get('/', verifyToken, analyzeController.getProduction)
analyzeRoute.post('/', verifyToken, analyzeController.createProduction)

module.exports = analyzeRoute
