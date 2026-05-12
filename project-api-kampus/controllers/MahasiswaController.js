// controllers/MahasiswaController.js
const Mahasiswa = require('../models/Mahasiswa');
// 1. Fungsi READ (Menampilkan Semua Data)
// Update bagian import di atas
const { Op } = require('sequelize'); // Import Operator Sequelize
const index = async (req, res) => {
    try {
        // Ambil query dari URL (misal: ?jurusan=TI)
        const { jurusan, nama } = req.query;
        // Siapkan kondisi pencarian
        let condition = {};
        if (jurusan) {
            condition.jurusan = jurusan; // WHERE jurusan = '...'
        }
        if (nama) {
            // WHERE nama LIKE '%Budi%'
            condition.nama = { [Op.like]: `%${nama}%` };
        }
        const data = await Mahasiswa.findAll({
            where: condition
        });
        res.status(200).json({
            status: 'success',
            total: data.length, // Info tambahan jumlah data
            data: data
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// 2. Fungsi CREATE (Menyimpan Data Baru)
const store = async (req, res) => {
    try {
        // Ambil data dari Body Postman
        const { nim, nama, jurusan, angkatan } = req.body;
        // Simpan ke Database via Model
        const dataBaru = await Mahasiswa.create({
            nim,
            nama,
            jurusan,
            angkatan
        });
        // Response 201 Created (Standar HTTP untuk data baru)
        res.status(201).json({
            status: 'success',
            message: 'Data berhasil ditambahkan',
            data: dataBaru
        });
    } catch (error) {
        res.status(400).json({ // 400 = Bad Request (misal data kurang)
            status: 'error',
            message: error.message
        });
    }
};
// 3. Fungsi UPDATE (Mengubah Data)
const update = async (req, res) => {
    try {
        // Tangkap parameter NIM dari URL (misal: /api/mahasiswa/1011)
        const { nim } = req.params;

        // Tangkap data baru dari Body
        const { nama, jurusan, angkatan } = req.body;
        // Cari data dulu, ada ga orangnya?
        const mhs = await Mahasiswa.findOne({ where: { nim: nim } });
        if (!mhs) {
            return res.status(404).json({
                status: 'error',
                message: 'Data mahasiswa tidak ditemukan'
            });
        }
        // Lakukan Update
        mhs.nama = nama;
        mhs.jurusan = jurusan;
        mhs.angkatan = angkatan;

        await mhs.save(); // Simpan perubahan ke DB
        res.status(200).json({
            status: 'success',
            message: 'Data berhasil diperbarui',
            data: mhs
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
// 4. Fungsi DELETE (Menghapus Data)
const destroy = async (req, res) => {
    try {
        const { nim } = req.params;
        // Hapus langsung berdasarkan NIM
        const jumlahDihapus = await Mahasiswa.destroy({
            where: { nim: nim }
        });
        // Cek apakah ada yang terhapus?
        if (jumlahDihapus === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Data tidak ditemukan'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Data berhasil dihapus permanen'
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
module.exports = { index, store, update, destroy }; // Update export