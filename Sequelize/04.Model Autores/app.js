const express = require('express')
const conn = require('./models/conn')

//Models
const Genero = require('./models/Genero')
const { Obra, Autor } = require('./models/associations')

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
    Genero.findAll({
        raw:true,
    })
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
    .then(() => {
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
        const dados = []
        Genero.findAll({raw:true})
        .then((generos) => {
            res.render('formobra',{generos, obra:{id:0}})
        })
        .catch((err) => {
            res.status(500).send(`Erro ao consultar generos: ${err}`)
        })
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
    const id = req.params.id
    Genero.findAll({raw:true})
    .then((generos) => {
        Obra.findOne({
            raw:true,
            where: {
                id:id,
            }
        }).then(obra =>{
            res.render('formobra', {generos, obra})
        }).catch((err) =>{ res.status(500).send(`Erro a consulda de Obra: ${err}`)})
    })
    .catch((err) => {
        res.status(500).send(`Houve um erro na consulta de Generos: ${err}`)
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

//Pages AUTORES
app.get('/autores', (req, res) => {
    Autor.findAll()
    .then((autores) => {
        res.render('autores', {autores})
    })
    .catch((err) => {
        console.error('Erro na consula', err)
        res.status(500).send('Erro ao consultar')
    })    
})
app.get('/autores/inserir', (req,res) => {
    res.render('formautor', {autor:[{id:0}]})
})

app.post('/autores/inserir', (req,res) => {
    const {nome, sobrenome} = req.body
    Autor.create({nome, sobrenome})
    .then(() => { res.redirect('/autores')})
    .catch(err => {
        res.status(500).send(`Erro ao inserir dados: ${err}`)
    })
})

app.get('/autores/alterar/:id', (req, res) => {
    const id = req.params.id
    Autor.findOne({
        raw: true,
        where: {
            id: id
        }
    })
    .then((autor) => {
        res.render('formautor', {autor})
    })
    .catch((err) => {
        res.status(500).send(`Erro ao consultar o autor: ${err}`)
    })
})

app.post('/autores/alterar/:id', (req, res) =>{
    const {id, nome, sobrenome} = req.body
    Autor.update({
        nome, sobrenome
    },
    {
        where:
        {
            id:id
        }
    })
    .then(() => {
        res.redirect('/autores')
    })
    .catch((err) => {
        res.ststaus(500).send(`Erro ao alterar registro: ${err}`)
    })
})

app.get('/autores/excluir/:id', (req, res) => {
    const id = req.params.id
    Autor.destroy({
        where:{
            id:id
        }
    })
    .then(() => {
        res.redirect('/autores')
    })
    .catch((err) => {
        res.status(500).send(`Erro ao exluir autor: ${err}`)
    })
})

//Model AUTOROBRA
app.get('/autorobra/:id', async (req,res) => {
    const id = req.params.id
    const dados = {}
    //Recupera todos os Autores
    Autor.findAll({
        raw: true,
    })
    .then((autores) => {
        Obra.findOne({
            where: {
                id:id
            },
            include: Autor,
        })
        .then(obras => {
            //res.send({autores,obras})
            res.render('formautorobra', {autores, obras})

        })
        .catch((err) => {
            res.status(500).send(`Erro ao consultar obras: ${err}`)
        })
    
    })
    .catch((err) => {
        res.status(500).send(`Erro ao consulra autores: ${err}`)
    })
    //Recupera os autores da Obra

})

app.post('/autorobra/inserir', async (req,res) => {
    const {obra, autor } = req.body
    Obra.findByPk(obra)
    .then(obra => {
        obra.addAutors([autor])
        res.redirect(`/autorobra/${obra.dataValues.id}`)
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


