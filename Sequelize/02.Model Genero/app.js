const express = require('express')
const conn = require('./models/conn')

//Models
const Genero = require('./models/Genero')

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

//Pages GENEROS
app.get('/generos', (re, res) => {
    Genero.findAll({raw:true})
    .then((generos) => {
        res.render('generos', {generos})
    })
    .catch((err) => {
        console.error('Erro na consula', err)
        res.status(500).send('Erro ao consultar')
    })
})
app.get('/generos/inserir', (req, res) => {
    res.render('formgenero', {data:[{id:0}]})
})
app.post('/generos/inserir', (req,res) => {
    const genero = req.body.genero
    Genero.create({genero})
    .then((data) => {
        res.redirect('/generos')
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})
app.get('/generos/alterar/:id', (req, res) => {
    const id = req.params.id
    Genero.findAll({raw:true, where:{ id: id}})
    .then((data) => {
        res.render('formgenero', {data})
    }

    )
})
app.post('/generos/alterar', (req,res) => {
    const {id, genero} = req.body
    Genero.update({genero}, {
        where: {
            id: id
        } 
    })
    .then(() => {
        res.redirect('/generos')
    })
    .catch((err) => {
        res.status(500).send(`Erro ao alterar: ${err}`)
    })
})
app.get('/generos/excluir/:id', (req, res) => {
    const id = req.params.id
    Genero.destroy({
        where: {
            id:id
        }
    })
    .then(() => {
        res.redirect('/generos')
    })
    .catch((err) => {
        res.status(500).send(`${err}`)
    })
})

//Sincronização de models
conn.sync()
.then(
    app.listen(3000, () => {
        console.log('Aplicação rodando')
    })
)
.catch((error) => {
    console.error('Não consegui sincronizar', error)
})
