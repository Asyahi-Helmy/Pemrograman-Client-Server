// routes/mahasiswa.js
const express = require('express');
const router = express.Router();
const DosenController = require('../controllers/DosenController');
// Definisikan Jalur
// Jika user akses GET /api/dosen -> jalankan fungsi index
router.get('/', DosenController.index);
// Jika user akses POST /api/dosen -> jalankan fungsi store
router.post('/', DosenController.store);
module.exports = router;