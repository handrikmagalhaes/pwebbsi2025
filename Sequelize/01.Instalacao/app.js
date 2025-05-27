const express = require('express')
const conn = require('./models/conn')

// Invocando o express
const app = express()

//Ler o body como JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json());
app.set('view engine', 'ejs');

//Arquivos estáticos
app.use(express.static('static'))

//Landing page
app.get('/', (req,res) => {
    res.render('index');
})

//Iniciando servidor WEB
app.listen(3000, () => {
    console.log('Aplicação rodando')
})
