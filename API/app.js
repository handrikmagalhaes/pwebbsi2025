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
    express.json(),
)

//Landing page
app.get('/', (req,res) => {
    res.status(200).send({msg:"Bem-vindo à aplicação"})
})

//Pages GENEROS
app.get('/generos', (req, res) => {
    Genero.findAll({
        raw:true,
    })
    .then((generos) => {
        res.status(200).send({generos})
    })
    .catch((err) => {
        console.error('Erro na consula', err)
        res.status(500).send({msg:'Erro ao consultar'})
    })
})
app.post('/generos/', (req,res) => {
    const genero = req.body.genero
    Genero.create({genero})
    .then(() => {
        res.status(201).send({msg:'Recurso criado com sucesso'})
    })
    .catch((err) => {
        res.status(500).send({msg:err})
    })
})
app.put('/generos/', (req,res) => {
    const {id, genero} = req.body
    Genero.update({genero}, {
        where: {
            id: id
        } 
    })
    .then(() => {
        res.status(200).send({msg:"Registro alterado com sucesso"})
    })
    .catch((err) => {
        res.status(500).send({msg:`Erro ao alterar: ${err}`})
    })
})
app.delete('/generos/:id', (req, res) => {
    const id = req.params.id
    Genero.destroy({
        where: {
            id:id
        }
    })
    .then(() => {
        res.status(200).send({msg:"Registro excluído com sucesso"})
    })
    .catch((err) => {
        res.status(500).send({msg:`${err}`})
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
    Autor.findAll({
        order: [
            ['nome', 'ASC']
        ]
    })
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

// Pages AutorObra
app.get('/autorobra/:id', (req, res) => {
    const id = req.params.id

    //Recuperar os dados de todos os autores
    Autor.findAll({
        raw:true,
    })
    .then((autores) => {
        Obra.findOne({
            where: {
                id:id
            },
            include: Autor,
        })
        .then(obras => {
            console.log(obras)
            res.render('formautorobra', {autores, obras})
        })
        .catch((err) => {
            res.status(500).send(`Erro ao selecionar obra: ${err}`)
        })
    })
    .catch(err => {
        res.status(500).send(`Erro ao selecionar Autores: ${err}`)
    })
})

app.post('/autorobra/inserir', (req,res) => {
    const {obra,autor} = req.body
    Obra.findByPk(obra)
    .then(data => {
        data.addAutors([autor])
        res.redirect(`/autorobra/${obra}`)
    })
    .catch(err => {
        res.status(500).send(`Erro ao associar autor: ${err}`)
    })
})

app.get('/autorobra/excluir/:idautor/:idobra', async (req,res) => {
    const idobra = req.params.idobra
    const idautor = req.params.idautor
    try {
        const autor = await Autor.findByPk(idautor)
        const obra = await Obra.findByPk(idobra)
        await obra.removeAutor(autor)
        res.redirect(`/autorobra/${idobra}`)
    } catch {
        res.status(500).send(`Erro ao excluir: ${err}`)
    }
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


