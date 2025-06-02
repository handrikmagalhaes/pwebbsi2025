const Obra = require('./Obra')
const Autor = require('./Autor')
//Criar a Relação
Obra.belongsToMany(Autor, {through: 'AutorObra'})
Autor.belongsToMany(Obra, {through: 'AutorObra'})

module.exports = {Obra, Autor}