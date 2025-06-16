const { DataTypes } = require('sequelize')
const Genero = require('./Genero')

const conn = require('./conn')

const Obra = conn.define('Obra', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subtitulo: {
       type: DataTypes.STRING 
    },
})

Genero.hasOne(Obra)
Obra.belongsTo(Genero)

module.exports = Obra