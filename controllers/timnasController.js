// Membuat variabel Mahasiswa dan mengimport/required dari model Mahasiswa
const Timnas = require("../models/Timnas");

// Dibawah ini kita menggunakan metod export, maka semua metod yang ada di dalam object(module.exports) akan ter export
module.exports = {
  // Membuat view untuk timnas
  viewTimnas: async (req, res) => {
    try {
      // Membuat variabel mahasiswa, dan menunda eksekusi hingga proses async selesai lalu mengambil model Mahasiswa
      // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database Mahasiswa
      const timnas = await Timnas.find();
      // Membuat variabel untuk alertMessage  dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
      const alert = { message: alertMessage, status: alertStatus };
      /**
       * Lalu render viewnya yang ada di dalam file index
       * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel mahasiswa diatas
       * Lalu merender alert yang sudah di deklar di atas
       */
      res.render("index", {
        timnas,
        alert,
        title: "CRUD", // Untuk title dari aplikasi kita, saya manamakannya dengan CRUD
      });
    } catch (error) {
      // Jika error maka akan meredirect ke route mahasiswa(routenya akan kita buat setelah selesai dengan mahasiswaController)
      res.redirect("/timnas");
    }
  },

  // Membuat create data untuk mahasiswa
  // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
  addTimnas: async (req, res) => {
    // memberi validasi untuk inputan yang kosong
    try {
      // Membuat contanta untuk nama, nim, jurusan, dan alamat yang diambil dari body/yang diketikan di form
      const { nama, no_punggung, posisi, gambar, klub, tanggal_naturalisasi } = req.body;
      // lalu mengembalikan fungsi dan membuat data dari scheme/model Mahasiswa
      await Timnas.create({ nama, no_punggung, posisi, gambar, klub, tanggal_naturalisasi });
      // ketika create data berhasil memberikan notifikasi
      req.flash("alertMessage", "Berhasil menambahkan data pemain timnas");
      req.flash("alertStatus", "success");
      res.redirect("/timnas"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong, maka redirect kehalaman
      res.redirect("/timnas");
    }
  },

  // Membuat read data untuk mahasiswa
  // types code in here..

// Membuat update data untuk mahasiswa
editTimnas: async (req, res) => {
    try {
      // Menerima id dan data pemain dari body request
      const { id, nama, no_punggung, posisi, gambar, klub, tanggal_naturalisasi } = req.body;
      // Cari pemain berdasarkan id
      const timnas = await Timnas.findOne({ _id: id });
      // Perbarui data pemain dengan data baru
      timnas.nama = nama;
      timnas.no_punggung = no_punggung;
      timnas.posisi = posisi;
      timnas.gambar = gambar;
      timnas.klub = klub;
      timnas.tanggal_naturalisasi = tanggal_naturalisasi;
      // Simpan perubahan ke database
      await timnas.save();
      // Berikan notifikasi bahwa perubahan berhasil
      req.flash("alertMessage", "Berhasil mengubah data pemain");
      req.flash("alertStatus", "success");
      // Redirect kembali ke halaman yang dituju
      res.redirect("/timnas");
    } catch (error) {
      // Tangani kesalahan jika ada
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // Redirect kembali ke halaman yang dituju
      res.redirect("/timnas");
    }
  },
  
  // Membuat view detail produk takumi
viewDetailTimnas: async (req, res) => {
    try {
      // Mendapatkan ID produk dari parameter URL
      const { id } = req.params;
      // Mencari produk berdasarkan ID
      const timnas = await Timnas.findById(id);
      
      // Memeriksa apakah produk ditemukan
      if (!timnas) {
        // Jika tidak ditemukan, kirimkan respon dengan status 404
        return res.status(404).send('Pemain tidak ditemukan');
      }
  
      // Jika produk ditemukan, render view detail_produk dan kirimkan data produk
      res.render('detail_timnas', { timnas });
    } catch (error) {
      // Jika terjadi kesalahan, kirimkan respon dengan status 500 dan pesan error
      res.status(500).send('Terjadi kesalahan saat memuat detail produk');
    }
  },
// Membuat delete data untuk mahasiswa
deleteTimnas: async (req, res) => {
    try {
      /*
  Membuat variabel yang menerima id yang didapat dari params
  id didapat database dan id isinya dari params
  */
      const { id } = req.params;
      // cek data Mahasiswa yang mau di delete berdasarkan id
      const timnas = await Timnas.findOne({ _id: id });
      // setelah datanya sudah didapat maka menghapusnya
      await timnas.deleteOne();
      // ketika delete data memberikan notifikasi
      req.flash("alertMessage", "Success delete data pemain");
      req.flash("alertStatus", "warning");
      // setelah berhasil remove maka melakukan redirect
      res.redirect("/timnas");
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputa kosong redirect kehalaman
      res.redirect("/timnas");
    }
  },
};