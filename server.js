// Chamar o Express
const express = require('express')
// Chamar o Nunjucks
const nunjucks = require('nunjucks')

// Chamar as rotas
const routes = require('./routes')

// Criar o servidor
const server = express()

// Habilita o req.body
server.use(express.urlencoded({ extended: true }))

// Arquivos estáticos da pasta public
server.use(express.static('public'))

server.use(routes)

// Setar a view engine
server.set('view engine', 'njk')

// Configurar alguma coisa
nunjucks.configure('views', {
    express: server,
    autoescape: false, // Funciona, por exemplo, quando tem tags HTML no meio de uma string
    noCache: true // Desativa o cache do Nunjucks
})

// Iniciar o servidor, que passa a escutar a porta definida
// A função callback é executada assim que a conexão é estabelecida
server.listen(5000, function () {
    console.log('server is running')
})