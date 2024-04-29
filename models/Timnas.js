const mongoose = require("mongoose");

const timnasScheme = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  no_punggung: {
    type: Number,
    required: true,
  },
  posisi: {
    type: String,
    required: true,
  },
  gambar: {
    type: String,
    required: true,
  },
  klub: {
    type: String,
    required: true,
  },
  tanggal_naturalisasi: {
    type: Date, // Menggunakan tipe Date untuk tanggal naturalisasi
    required: false,
    validate: {
      // Validasi tambahan untuk memastikan tanggal yang dimasukkan adalah tanggal yang valid
      validator: function (value) {
        return value instanceof Date && !isNaN(value);
      },
      message: "Tanggal naturalisasi harus dalam format tanggal yang valid.",
    },
  },
});
const Timnas = mongoose.model("Timnas", timnasScheme);
module.exports = Timnas;

