var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Cadastros', function () {

    it('Deve listar TODOS os cadastros em /cadastros', function (done) {
        chai.request(server)
            .get('/cadastros')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('Deve criar ÚNICO cadastro em /cadastros/criar', function (done) {
        chai.request(server)
            .post('/cadastros/criar')
            .set({ 'content-type': 'application/x-www-form-urlencoded' })
            .send({ 'firtname': 'Vitor', 'lastname': 'Savedra', 'user': 'savedra', 'email:': 'vitor-savedra@outlook.com' })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('Deve listar ÚNICO cadastro em /cadastros/:user', function (done) {
        chai.request(server)
            .get('/cadastros/savedra')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('Deve atualizar ÚNICO cadastro em /cadastros/:user/editar', function (done) {
        chai.request(server)
            .post('/cadastros/savedra')
            .set({ 'content-type': 'application/x-www-form-urlencoded' })
            .send({ 'firtname': 'Vitor', 'lastname': 'Savedra', 'user': 'vsavedra', 'email:': 'vitor-savedra@outlook.com' })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('Deve deletar ÚNICO cadastro em /cadastros/:user/deletar', function (done) {
        chai.request(server)
            .get('/cadastros/vsavedra/deletar')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});