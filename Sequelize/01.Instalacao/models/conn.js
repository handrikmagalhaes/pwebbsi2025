const { Sequelize } = require('sequelize')

// Inicializar
const sequelize = new Sequelize('obras', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

sequelize.authenticate()
.then(()=> {
    console.log('Banco d dados conectado')
})
.catch((error) => {
    console.error('Não foi possivel conectar', error)
})

module.exports = sequelize