const multer = require('multer')
const logger = require('../utils/logger')

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/svg']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    logger.info('File type not supported')
    cb(new Error('File type not supported', false))
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
})

module.exports = upload
