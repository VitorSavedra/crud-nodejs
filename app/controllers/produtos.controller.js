const Produto = require('../models/produto');

// Exporta funções.
module.exports = {
    exibeCategorias: exibeCategorias,
    exibeCategoriaUnica: exibeCategoriaUnica,
    exibeProdutos: exibeProdutos,
    exibeProdutoUnico: exibeProdutoUnico,
    exibeCriarProduto: exibeCriarProduto,
    validaCriarProduto: validaCriarProduto,
    exibeEditarProduto: exibeEditarProduto,
    validaEditarProduto: validaEditarProduto,
    deletaProduto: deletaProduto
};

// Exibe página de categorias.
function exibeCategorias(req, res) {
    res.render('pages/categorias');
};

// Exibe página de categoria única.
function exibeCategoriaUnica(req, res) {
    Produto.find({ category: req.params.category }, (err, produtos) => {
        if (produtos) {
            res.status(200);
            res.render('pages/categoria', {
                produtos: produtos
            });
        } else {
            res.status(404);
            res.render('pages/404');
        };
    });
};

// Exibe página de todos os produtos.
function exibeProdutos(req, res) {
    Produto.find({}, (err, produtos) => {
        if (produtos) {
            res.status(200);
            res.render('pages/produtos', {
                produtos: produtos
            });
        } else {
            res.status(404);
            res.render('pages/404');
        };
    });
};

// Exibe página de produto único.
function exibeProdutoUnico(req, res) {
    Produto.findOne({ slug: req.params.slug }, (err, produto) => {
        if (produto) {
            res.status(200);
            res.render('pages/produto', {
                produto: produto
            });
        } else {
            res.status(404);
            res.render('pages/404');
        };
    });
};

// Exibe página de criação de produto.
function exibeCriarProduto(req, res) {
    res.render('pages/criar');
};

// Cria novo produto.
function validaCriarProduto(req, res) {
    const produto = new Produto({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category
    });

    // Salva produto.
    produto.save((err) => {
        if (err)
            throw err;

        // Redireciona para novo produto criado.
        res.redirect(`/produtos/${produto.slug}`);
    });
};

// Exibe página de editar produto.
function exibeEditarProduto(req, res) {
    Produto.findOne({ slug: req.params.slug }, (err, produto) => {
        res.render('pages/editar', {
            produto: produto
        });
    });
};

// Salva edição de produto.
function validaEditarProduto(req, res) {

    // Seleciona produto atual.
    Produto.findOne({ slug: req.params.slug }, (err, produto) => {
        // Atualiza produto selecionado.
        produto.name = req.body.name;
        produto.description = req.body.description;
        produto.price = req.body.price;
        produto.category = req.body.category;

        produto.save((err) => {
            if (err)
                throw err;

            res.redirect('/produtos');
        });
    });
};

// Deleta produto.
function deletaProduto(req, res) {
    Produto.remove({ slug: req.params.slug }, (err) => {
        res.redirect('/produtos');
    });
};