const Cadastro = require('../models/cadastro');

// Exporta funções.
module.exports = {
    exibeCadastros: exibeCadastros,
    exibeCadastroUnico: exibeCadastroUnico,
    exibeCriarCadastro: exibeCriarCadastro,
    validaCriarCadastro: validaCriarCadastro,
    exibeEditarCadastro: exibeEditarCadastro,
    validaEditarCadastro: validaEditarCadastro,
    deletaCadastro: deletaCadastro
};

// Exibe página de cadastros.
function exibeCadastros(req, res) {
    Cadastro.find({}, (err, cadastros) => {
        if (cadastros) {
            res.status(200);
            res.render('pages/cadastros', {
                cadastros: cadastros
            });
        } else {
            res.status(404);
            res.render('pages/404');
        };
    });
};

// Exibe página de cadastro único.
function exibeCadastroUnico(req, res) {
    Cadastro.findOne({ user: req.params.user }, (err, cadastro) => {
        if (cadastro) {
            res.status(200);
            res.render('pages/cadastro', {
                cadastro: cadastro
            });
        } else {
            res.status(404);
            res.render('pages/404');
        };
    });
};

// Exibe página de criação de cadastro.
function exibeCriarCadastro(req, res) {
    res.render('pages/criar-cadastro');
};

// Cria novo cadastro.
function validaCriarCadastro(req, res) {
    const cadastro = new Cadastro({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        user: req.body.user,
        email: req.body.email,
        password: req.body.password
    });

    // Salva cadastro.
    cadastro.save((err) => {
        if (err)
            throw err;

        // Redireciona para novo cadastro criado.
        res.redirect(`/cadastros/${cadastro.user}`);
    });
};

// Exibe página de editar cadastro.
function exibeEditarCadastro(req, res) {
    Cadastro.findOne({ user: req.params.user }, (err, cadastro) => {
        res.render('pages/editar-cadastro', {
            cadastro: cadastro
        });
    });
};

// Salva edição de cadastro.
function validaEditarCadastro(req, res) {

    // Seleciona cadastro atual.
    Cadastro.findOne({ user: req.params.user }, (err, cadastro) => {
        // Atualiza cadastro selecionado.
        cadastro.firstname = req.body.firstname;
        cadastro.lastname = req.body.lastname;
        cadastro.user = req.body.user;
        cadastro.email = req.body.email;
        cadastro.password = req.body.password;

        cadastro.save((err) => {
            if (err)
                throw err;

            res.redirect('/cadastros');
        });
    });
};

// Deleta cadastro.
function deletaCadastro(req, res) {
    Cadastro.remove({ user: req.params.user }, (err) => {
        res.redirect('/cadastros');
    });
};