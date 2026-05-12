// models/Mahasiswa.js
const { DataTypes } = require('sequelize');
const db = require('../config/database');
// Definisikan Struktur Tabel (Schema)
const Mahasiswa = db.define('Mahasiswa', {
    // Kolom 1: NIM
    nim: {
    type: DataTypes.STRING,
    allowNull: false, // Tidak boleh kosong
    primaryKey: true // Menjadi Primary Key
    },
    // Kolom 2: Nama
    nama: {
    type: DataTypes.STRING,
    allowNull: false
    },
    // Kolom 3: Jurusan
    jurusan: {
    type: DataTypes.STRING,
    defaultValue: 'Teknik Informatika' // Nilai default jika kosong
    },
    // Kolom 4: Angkatan (Integer)
    angkatan: {
    type: DataTypes.INTEGER,
    allowNull: false
    }
}, {
    tableName: 'mahasiswa', // Nama tabel di database nanti
    timestamps: true // Otomatis buat kolom createdAt & updatedAt
});
module.exports = Mahasiswa;