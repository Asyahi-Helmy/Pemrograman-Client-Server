// models/Dosen.js
const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Dosen = db.define('Dosen', {
    nidn: {
        type: DataTypes.STRING,
        allowNull: false, 
        primaryKey: true 
    },
    nama_dosen: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status_aktif: {
        type: DataTypes.BOOLEAN,
        defaultValue: true 
    },
}, {
    tableName: 'dosen', 
    timestamps: true 
});

module.exports = Dosen;