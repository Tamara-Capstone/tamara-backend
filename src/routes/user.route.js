const express = require('express')
const upload = require('../middlewares/multer')
const ImgUpload = require('../middlewares/storage')
const verifyToken = require('../middlewares/verifyToken')
const userController = require('../controllers/user.controller')

const userRoute = express.Router()

userRoute.get('/', verifyToken, userController.getUser)
userRoute.put('/', verifyToken, upload.single('photo'), ImgUpload.uploadToGcs, userController.updateUser)

module.exports = userRoute
