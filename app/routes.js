const express = require('express'),
    router = express.Router(),
    mainController = require('./controllers/main.controller'),
    produtosController = require('./controllers/produtos.controller'),
    cadastrosController = require('./controllers/cadastros.controller');

// Exporta rota.
module.exports = router;

// Define rotas:

// Home
router.get('/', mainController.exibeHome);

// Produtos
router.get('/produtos', produtosController.exibeProdutos);
router.get('/produtos/criar', produtosController.exibeCriarProduto);
router.post('/produtos/criar', produtosController.validaCriarProduto);
router.get('/produtos/:slug/editar', produtosController.exibeEditarProduto);
router.post('/produtos/:slug', produtosController.validaEditarProduto);
router.get('/produtos/:slug/deletar', produtosController.deletaProduto);
router.get('/produtos/:slug', produtosController.exibeProdutoUnico);

// Categorias
router.get('/categorias', produtosController.exibeCategorias);
router.get('/categorias/:category', produtosController.exibeCategoriaUnica);

// Cadastros
router.get('/cadastros', cadastrosController.exibeCadastros);
router.get('/cadastros/criar', cadastrosController.exibeCriarCadastro);
router.post('/cadastros/criar', cadastrosController.validaCriarCadastro);
router.get('/cadastros/:user/editar', cadastrosController.exibeEditarCadastro);
router.post('/cadastros/:user', cadastrosController.validaEditarCadastro);
router.get('/cadastros/:user/deletar', cadastrosController.deletaCadastro);
router.get('/cadastros/:user', cadastrosController.exibeCadastroUnico);