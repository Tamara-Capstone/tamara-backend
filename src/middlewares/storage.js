const { Storage } = require('@google-cloud/storage')
const CONFIG = require('../config/environtment')
const uuid = require('uuid').v4
const path = require('path')

const pathKey = path.resolve('./credentials.json')

const gcs = new Storage({
  projectId: CONFIG.googleProjectId,
  keyFilename: pathKey
})

const bucketName = CONFIG.storageBucketName
const bucket = gcs.bucket(bucketName)

const getPublicUrl = (filename) => {
  return 'https://storage.googleapis.com/' + bucketName + '/' + filename
}

const getFileName = (url) => {
  return url.split('/').pop()
}

const ImgUpload = {}

ImgUpload.uploadToGcs = (req, res, next) => {
  if (!req.file) return next()

  const gcsname = uuid() + '-' + req.file.originalname
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
    next()
  })

  stream.end(req.file.buffer)
}

ImgUpload.delete = async (url) => {
  const fileName = getFileName(url)
  const file = bucket.file(fileName)

  try {
    await file.delete()
    return `Image ${fileName} deleted successfully`
  } catch (error) {
    return 'Error deleting image'
  }
}

module.exports = ImgUpload
