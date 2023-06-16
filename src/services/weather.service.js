const axios = require('axios')
const CONFIG = require('../config/environtment')

const fetcher = axios.create({
  baseURL: CONFIG.weatherApiUrl
})

const getAllWeathers = async () => {
  const { data } = await fetcher.get('/wilayah.json')
  return data
}

const getNearestCity = (weathers, lat, lon) => {
  let nearestCity = null
  let minDistance = Infinity

  weathers.forEach((city) => {
    const latDiff = Math.abs(parseFloat(lat) - parseFloat(city.lat))
    const lonDiff = Math.abs(parseFloat(lon) - parseFloat(city.lon))
    const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff)

    if (distance < minDistance) {
      minDistance = distance
      nearestCity = city
    }
  })

  return nearestCity
}

const getWeatherByLocation = async (lat, lon) => {
  let response
  const weathers = await getAllWeathers()
  response = weathers.filter((wheater) => parseFloat(wheater.lat) === lat && parseFloat(wheater.lon) === lon)[0]
  if (!response) response = getNearestCity(weathers, lat, lon)
  const data = await getWeatherById(response.id)
  const result = data.map((weather) => ({ ...response, ...weather }))
  return result
}

const getWeatherByKeyword = async (keyword) => {
  const weathers = await getAllWeathers()
  return weathers.filter(
    (wheater) =>
      wheater.propinsi.toLowerCase().includes(keyword.toLowerCase()) ||
      wheater.kota.toLowerCase().includes(keyword.toLowerCase()) ||
      wheater.kecamatan.toLowerCase().includes(keyword.toLowerCase())
  )
}

const getWeatherById = async (weatherId) => {
  const { data } = await fetcher.get(`/${weatherId}.json`)
  const result = getRecommendationWeather(data)
  return result
}

const getRecommendationWeather = (weathers) => {
  const recommendations = [
    { cerah: 'Menyiram tanaman dan perhatikan tanda - tanda kelelahan sinar matahari.' },
    { 'cerah berawan': 'Menyiram tanaman dan periksa kelembapan tanah.' },
    { berawan: 'Menyiram tanaman, perhatikan kelembapan tanah, dan sirkulasi udara yang baik.' },
    { 'berawan tebal': 'Menyiram sedikit, hindari kelebihan air, dan berikan pencahayaan tambahan jika diperlukan.' },
    { 'hujan ringan': 'Pastikan drainase yang baik dan lindungi tanaman dari genangan air.' },
    { 'hujan sedang': 'Pastikan drainase yang baik dan periksa tanaman setelah hujan.' },
    { 'hujan lebat': 'Pastikan drainase yang baik dan periksa tanaman setelah hujan.' },
    { 'hujan petir': 'Hindari kontak dengan tanaman dan lindungi dari angin dan hujan yang merusak.' },
    { kabut: 'Pastikan kelembapan tanah dan periksa masalah jamur.' }
  ]

  // hapus cuaca yang nilai nya ''
  const filteredWeathers = weathers.filter((weather) => weather.cuaca !== '')
  const result = filteredWeathers.map((weather) => {
    const { cuaca } = weather
    const recommendation = recommendations.filter((recommendation) => recommendation[cuaca.toLowerCase()])
    return { ...weather, recommendation: recommendation[0][cuaca.toLowerCase()] }
  })
  return result
}

const getWeatherByDate = (weather) => {
  const getCurrentTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  // Fungsi untuk mendapatkan data cuaca terdekat dengan waktu saat ini
  const getNearestWeatherData = (data) => {
    const currentTime = getCurrentTime()
    let nearestData = null
    let timeDiff = Infinity

    data.forEach((item) => {
      const dataTime = new Date(item.jamCuaca)
      const diff = Math.abs(dataTime - new Date(currentTime))

      if (diff < timeDiff) {
        nearestData = item
        timeDiff = diff
      }
    })

    return nearestData
  }

  const nearestWeatherData = getNearestWeatherData(weather)
  return nearestWeatherData
}

module.exports = {
  getWeatherByLocation,
  getWeatherByKeyword,
  getWeatherById,
  getRecommendationWeather,
  getWeatherByDate
}
