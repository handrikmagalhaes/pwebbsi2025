const express = require('express')
const path = require('path')
const basePath = path.join(__dirname)
const app = express() 
app.use(express.static('static'))
app.set('view engine', 'ejs')
//Rotas
app.get('/', (req, res) => {
    res.render('index', {"titulo":"Veterinaria Modelo"})
})
app.get('/clientes', (req,res) => {
    res.render('clientes', {dados: [{"id":1,"nome":"Handrik Magalhães","email":"handrik@ifal.edu.br", "telefone": "82-981445053"}]})
})

 
// Criar o servidor web
app.listen(3000, console.log('Servidor iniciado na porta 3000'))
