// https://www.npmjs.com/package/chai
const chai = require('chai');
// http://www.chaijs.com/plugins/chai-http/
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { startServer, stopServer, app } = require('../app/server.js');

const expect = chai.expect;

describe('Integration tests for: /', function () {
    before(function () {
        return startServer(true);
    });

    after(function () {
        return stopServer();
    });

    it('Should return index.html', function () {
        chai.request(app)
            .get('/')
            .then(res => {
                expect(res).to.have.status(200);
                expect(res).to.be.html;
                expect(res.text).to.have.string('<!DOCTYPE html>');
            });
    });
});