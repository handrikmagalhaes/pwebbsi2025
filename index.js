const express = require('express')
const path = require('path')
const basePath = path.join(__dirname)
const app = express()

app.use(express.static('static'))
//Rotas
app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})
app.get('/livros', (req, res) => {
    res.sendFile(`${basePath}/livros.html`)
})


// Criar o servidor web
app.listen(3000, console.log('Servidor iniciado na porta 3000'))