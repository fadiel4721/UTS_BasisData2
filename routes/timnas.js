// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const timnasController = require("../controllers/timnasController");

// endpoint timnas
router.get("/", timnasController.viewTimnas); // Untuk view
router.post("/", timnasController.addTimnas); // Untuk menambahkan data timnas
router.put("/", timnasController.editTimnas); // Untuk edit data timnas
router.delete("/:id", timnasController.deleteTimnas); // Untuk delete data timnas
router.get('/:id', timnasController.viewDetailTimnas); // Untuk menampilkan detail timnas

// Lalu export routernya
module.exports = router;