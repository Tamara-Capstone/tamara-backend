const multer = require('multer')

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/svg']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('File type not supported', false))
  }
}

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter
})

module.exports = upload
