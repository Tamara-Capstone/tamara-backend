const db = require('../utils/db')

const addProduction = async (payload) => {
  return await db.production.create({ data: payload })
}

const getProductionUserLogin = async (userId) => {
  return db.production.findMany({ where: { userId } })
}

const analyzeProduction = (payload) => {
  const jenisKomoditas = payload.jenis_tanaman
  const luasLahan = payload.luas_lahan
  const jumlahPanen = payload.hasil_panen
  const hargaPasaran = payload.harga_pasaran
  const biaya = payload.biaya

  const produktivitas = Math.round(jumlahPanen * (10000 / luasLahan))
  const pendapatan = hargaPasaran * jumlahPanen
  const totalBiayaProduksi = Object.values(biaya).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  const keuntungan = pendapatan - totalBiayaProduksi

  return {
    jenis_komoditas: jenisKomoditas,
    jumlah_panen: jumlahPanen,
    produktivitas,
    total_biaya_produksi: totalBiayaProduksi,
    pendapatan,
    keuntungan
  }
}

module.exports = {
  addProduction,
  analyzeProduction,
  getProductionUserLogin
}
