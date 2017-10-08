import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import api from '../service/api/Api';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET API index', () => {
    it('should be json', () => {
        return chai.request(api).get('/')
            .then(res => {
                expect(res.type).to.eql('application/json');
            });
    });

    it('should have a welcome message', () => {
        return chai.request(api).get('/')
            .then(res => {
                expect(res.body.message).to.eql('Welcome to FilmPolis\' Api!');
            });
    });
});

describe('POST api/users', () => {

    it('should return a confirm message (SignIn)', () => {
        return chai.request(api).post('/api/users/signin')
            .send({ username: "MigueDev96", password: "12345678" })
            .then(res => {
                expect(res.status).to.equal(201);
                expect(res).to.be.json;
                expect(res.body.data).to.exist;
            });
    });

    it('should return a token (LogIn)', () => {
        return chai.request(api).post('/api/users/login')
            .send({ username: "Miguex", password: "123456" })
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body.data).to.exist;
                expect(res.body.data).to.have.all.keys([
                    'userId',
                    'token'
                ]);
            });
    });
});