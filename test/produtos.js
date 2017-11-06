var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Produtos', function () {

    it('Deve listar TODOS os produtos em /produtos', function (done) {
        chai.request(server)
            .get('/produtos')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('Deve criar ÚNICO produto em /produtos/criar', function (done) {
        chai.request(server)
            .post('/produtos/criar')
            .set({ 'content-type': 'application/x-www-form-urlencoded' })
            .send({ 'name': 'Produto Teste', 'description': 'In lorem ipsum.', 'price': 100, 'category:': 'inutilidades' })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('Deve listar ÚNICO produto em /produtos/:slug', function (done) {
        chai.request(server)
            .get('/produtos/Produto%20Teste')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('Deve atualizar ÚNICO produto em /produtos/:slug/editar', function (done) {
        chai.request(server)
            .post('/produtos/Produto%20Teste')
            .set({ 'content-type': 'application/x-www-form-urlencoded' })
            .send({ 'name': 'Produto Teste Editado', 'description': 'In lorem ipsum sit amet.', 'price': 999, 'category:': 'Inutilidades' })
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('Deve deletar ÚNICO produto em /produtos/:slug/deletar', function (done) {
        chai.request(server)
            .get('/produtos/Produto%20Teste%20Editado/deletar')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });
});