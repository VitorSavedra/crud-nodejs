const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Cria Schema de cadastro.
const cadastroSchema = new Schema({
    firstname: String,
    lastname: String,
    user: {
        type: String,
        unique: true
    },
    email: String,
    password: String
});

// Cria modelo.
const cadastroModel = mongoose.model('Cadastro', cadastroSchema);

// Exporta modelo.
module.exports = cadastroModel;