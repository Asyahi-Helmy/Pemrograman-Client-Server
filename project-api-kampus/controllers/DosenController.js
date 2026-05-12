const { Op } = require('sequelize');
const Dosen = require('../models/Dosen');

const index = async (req, res) => {
    try {
        const { status_aktif, nama } = req.query;
        let condition = {};
        if (status_aktif) {
            condition.status_aktif = status_aktif;
        }
        if (nama) {
            // Gunakan nama_dosen sesuai field di model
            condition.nama_dosen = { [Op.like]: `%${nama}%` }; 
        }

        // Ganti Mahasiswa.findAll menjadi Dosen.findAll
        const data = await Dosen.findAll({ where: condition });
        
        res.status(200).json({
            status: 'success',
            total: data.length,
            data: data
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const store = async (req, res) => {
    try {
        // Ambil field yang sesuai dengan tabel Dosen
        const { nidn, nama_dosen, status_aktif } = req.body;
        
        const dataBaru = await Dosen.create({
            nidn,
            nama_dosen,
            status_aktif
        });

        res.status(201).json({
            status: 'success',
            message: 'Data Dosen berhasil ditambahkan',
            data: dataBaru
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = { index, store };