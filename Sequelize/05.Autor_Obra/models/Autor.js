const { DataTypes} = require('sequelize')
const conn = require('./conn')

const Autor = conn.define('Autor', {
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    sobrenome:{
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Autor