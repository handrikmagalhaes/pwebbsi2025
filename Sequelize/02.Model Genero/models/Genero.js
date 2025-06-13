const { DataTypes } = require('sequelize')

const conn = require('./conn')

const Genero = conn.define('Genero', {
    genero: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Genero