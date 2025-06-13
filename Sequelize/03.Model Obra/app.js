const express = require('express')
const conn = require('./models/conn')

//Models
const Genero = require('./models/Genero')
const Obra = require('./models/Obra')

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
        console.log(data.dataValues.id)
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
        console.log(data)
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

//Pages OBRAS
app.get('/obras', (req,res) => {
    Obra.findAll({include:Genero})
    .then((obras) => {
        res.render('obras', {obras})
    })
    .catch((err) => {
        console.error('Erro na consula', err)
        res.status(500).send('Erro ao consultar')
    })
})

app.get('/obras/inserir', (req,res) => {
        res.render('formobra', {data:[{id:0}]})
})

app.post('/obras/inserir', (req,res) => {
    const { titulo, subtitulo, genero } = req.body
    Obra.create({GeneroId:genero, titulo, subtitulo})
    .then(() => {
        res.redirect('/obras')
    })
    .catch((err) => {
        res.status(500).send(`Erro ao incluir: ${err}`)
    })
})

app.get('/obras/alterar/:id', (req, res) => {
    const dados = []
    Genero.findAll({raw:true})
    .then((generos) => {
        dados.push(generos)
    })
    .catch((err) => {
        res.status(500).send(`Houve um erro na consulta de Generos: ${err}`)
    })
    Obra.findOne({
        raw:true,
        where: {
            id:req.params.id
        }
    })
    .then((obras) => {
        dados.push([obras])
        res.render("formobra", {dados})
    })
    .catch((err) => {
        res.status(500).send(`Erro na consulta de Obras: ${err}`)
    })    
})

app.post('/obras/alterar', (req, res) => {
    const { id, titulo, subtitulo, autor, genero} = req.body
    Obra.update({GeneroId:genero, id, titulo, subtitulo}, {
        where: {
            id: id,
        }
    })
    .then(() => {
        res.redirect('/obras')
    })
    .catch((err) => {
        res.status(500).send(`Erro ao alterar Obre: ${err}`)
    })
})

app.get('/obras/excluir/:id', (req, res) => {
    const id = req.params.id
    Obra.destroy({
        where: {
            id:id
        }
    })
    .then(() => {
        res.redirect('/obras')
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
