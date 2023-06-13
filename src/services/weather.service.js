const axios = require('axios')
const CONFIG = require('../config/environtment')

const fetcher = axios.create({
  baseURL: CONFIG.weatherApiUrl
})

const getAllWeathers = async () => {
  const { data } = await fetcher.get('/wilayah.json')
  return data
}

const getWeatherByLocation = async (lat, lon) => {
  const weathers = await getAllWeathers()
  const response = weathers.filter((wheater) => parseFloat(wheater.lat) === lat && parseFloat(wheater.lon) === lon)
  const data = await getWeatherById(response[0].id)
  const result = getRecommendationWeather(data)
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
  const waktuSaatIni = new Date()
  const formatWaktuSaatIni = waktuSaatIni.toISOString().slice(0, 19).replace('T', ' ')
  const hasil = weather.reduce(
    (closest, cuaca) => {
      const waktuCuaca = new Date(cuaca.jamCuaca)
      const waktuTerdekat = new Date(closest.jamCuaca)
      if (waktuCuaca <= waktuSaatIni && waktuCuaca > waktuTerdekat) {
        return cuaca
      }
      return closest
    },
    { jamCuaca: formatWaktuSaatIni }
  )
  return hasil
}

module.exports = {
  getWeatherByLocation,
  getWeatherByKeyword,
  getWeatherById,
  getRecommendationWeather,
  getWeatherByDate
}
