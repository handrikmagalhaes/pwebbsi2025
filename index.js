const express = require('express')
const path = require('path')
const basePath = path.join(__dirname)
const app = express()

app.use(express.static('static'))
//Rotas
app.get('/', (req, res) => {
    res.sendFile(`${basePath}/index.html`)
})
app.get('/cadastro', (req,res) => {
    res.sendFile(`${basePath}/cadastro.html`)
})

app.post('/cadastro', (req,res) => {
    res.send('Animal Cadastrado')
})

app.get('/sobre/:id/', (req, res) => {
    console.log(res)
    res.send(req.params.id)
})






// Criar o servidor web
app.listen(3000, console.log('Servidor iniciado na porta 3000'))