// Di file router Anda (misalnya routes.js)
const express = require('express');
const router = express.Router();

// Rute untuk halaman daftar nama pemain
router.get('/timnas_cards', (req, res) => {
    // Di sini Anda akan menentukan logika untuk menampilkan daftar nama pemain
    // Misalnya, mengambil data dari database dan merender tampilan
    res.render('timnas_cards'); // Menggunakan EJS untuk merender tampilan
});

module.exports = router;
