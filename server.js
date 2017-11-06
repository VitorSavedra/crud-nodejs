// Carrega variáveis de ambiente.
require('dotenv').config();

// Carrega dependências.
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    expressLayouts = require('express-ejs-layouts'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// Define diretório de arquivos estáticos.
app.use(express.static(__dirname + '/public'));

// Define EJS como mecanismo de moldagem/modelo.
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Conecta com o banco de dados.
mongoose.connect(process.env.DB_URI, { useMongoClient: true });

// Define o body-parser como mecanismo para "montar" objetos através dos formulários.
app.use(bodyParser.urlencoded({ extended: true }));

// Define rotas.
app.use(require('./app/routes'));

// Inicia servidor.
app.listen(port, () => {
    console.log(`Servidor executando em http://localhost:${port}.`);
});

module.exports = app;