const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Cria Schema de produto.
const produtoSchema = new Schema({
    name: String,
    slug: {
        type: String,
        unique: true
    },
    description: String,
    price: Number,
    category: String
});

// Certifica que a URL seja criada a partir do nome.
produtoSchema.pre('save', function (next) {
    this.slug = this.name;
    next();
});

// Cria modelo.
const produtoModel = mongoose.model('Produto', produtoSchema);

// Exporta modelo.
module.exports = produtoModel;