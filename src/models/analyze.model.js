const mongoose = require('mongoose')

const analyzeSchema = new mongoose.Schema({
  tanggal: {
    type: Date,
    default: Date.now
  },
  jenis_komoditas: {
    type: String,
    required: true
  },
  jumlah_panen: {
    type: Number,
    required: true
  },
  produktivitas: {
    type: Number,
    required: true
  },
  total_biaya_produksi: {
    type: Number,
    required: true
  },
  pendapatan: {
    type: Number,
    required: true
  },
  keuntungan: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
})

const Analyze = mongoose.model('analyze', analyzeSchema)
module.exports = Analyze
