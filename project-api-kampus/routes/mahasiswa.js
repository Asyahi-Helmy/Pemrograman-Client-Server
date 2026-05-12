// routes/mahasiswa.js
const express = require('express');
const router = express.Router();
const MahasiswaController = require('../controllers/MahasiswaController');
// Import Validator
const { body, validationResult } = require('express-validator');
// Middleware Validasi
const validasiMhs = [
    body('nim').isLength({ min: 5 }).withMessage('NIM minimal 5 karakter'),
    body('nama').notEmpty().withMessage('Nama tidak boleh kosong'),
    body('angkatan').isInt().withMessage('Angkatan harus angka tahun')
];
// Routes
router.get('/', MahasiswaController.index);
// Pasang validasi di tengah (sebagai middleware)
router.post('/', validasiMhs, (req, res, next) => {
    // Cek error di sini
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            errors: errors.array()
        });
    }
    next(); // Lanjut ke Controller jika aman
}, MahasiswaController.store);
// Update & Delete
router.put('/:nim', MahasiswaController.update);
router.delete('/:nim', MahasiswaController.destroy);
module.exports = router;