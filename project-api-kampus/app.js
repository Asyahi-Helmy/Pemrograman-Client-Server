// app.js
const express = require('express');
const app = express();
const db = require('./config/database');
const cors = require('cors');
const { Sequelize, DataTypes, Op } = require('sequelize');

//routes
const mahasiswaRoutes = require('./routes/mahasiswa');
const dosenRoutes = require('./routes/dosen');

const Mahasiswa = require('./models/Mahasiswa');
const Dosen = require('./models/Dosen');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());

// --- DATABASE SYNC ---
// Gunakan alter: true agar data tidak hilang
(async () => {
    try {
        await db.sync({ alter: true });
        console.log(' Database Sync Berhasil');
    } catch (error) {
        console.error(' Database Sync Gagal:', error);
    }
})();

// --- DAFTAR ROUTES ---
app.get('/', (req, res) => res.send('API Kampus Ready!'));

// Route (jalan)
app.use('/api/mahasiswa', mahasiswaRoutes);
app.get('/api/mahasiswa', async (req, res) => {
    try {
        // 1. Tangkap kata kunci dari URL (misal: ?nama=budi)
        const keyword = req.query.nama;

        // 2. Siapkan wadah untuk kondisi pencarian
        let kondisi = {};
        // 3. Jika user mengirim kata kunci, buat kondisi pencarian LIKE
        if (keyword) {
            kondisi = {
                nama: {
                    [Op.like]: `%${keyword}%` // Mencari nama yang "mengandung" keyword
                }
            };
        }
        // 4. Cari di database (jika kondisi kosong, akan tampil semua)
        const data = await Mahasiswa.findAll({ where: kondisi });
        res.status(200).json({
            message: "Berhasil mengambil data",
            data: data
        });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
});
app.use('/api/dosen', dosenRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di: http://localhost:${PORT}`));