const CONFIG = {
  port: process.env.PORT,
  db: process.env.MONGODB_URL,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  googleProjectId: process.env.GOOGLE_PROJECT_ID,
  storageBucketName: process.env.STORAGE_BUCKET_NAME,
  machineLearningUrl: process.env.MACHINE_LEARNING_URL,
  weatherApiUrl: 'https://ibnux.github.io/BMKG-importer/cuaca'
}

module.exports = CONFIG
