const multer = require('multer')
const uuid = require('uuid').v4

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/svg']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('File type not supported', false))
  }
}

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + '-' + file.originalname)
  }
})

const uploadLocal = multer({
  storage: localStorage,
  fileFilter
})

const uploadStorage = multer({
  storage: multer.memoryStorage(),
  fileFilter
})

module.exports = { uploadLocal, uploadStorage }
