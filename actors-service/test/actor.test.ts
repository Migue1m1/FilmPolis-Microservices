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

describe('GET api/actors', () => {

    it('should include Brad Pitt', () => {
        return chai.request(api).get('/api/actors/Brad Pitt')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
                expect(res.body.data).to.exist;
                expect(res.body.data).to.have.all.keys([
                    '_id',
                    'id',
                    'name',
                    'birthDay',
                    'deathDay',
                    'birthPlace',
                    'gender',
                    'biography',
                    'imageURL',
                    'imdbId'
                ]);
            });
    });
});