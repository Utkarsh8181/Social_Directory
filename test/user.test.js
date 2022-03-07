import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js'
import {faker} from '@faker-js/faker'
chai.use(chaiHttp)

chai.should();

describe("Registration Api", () => {
    it('should give true when response is comming from the controller', (next) => {
        chai.request(server)
        .post('/signup')
        .send({
            email: faker.internet.email(),
            password: "AKash@123",
            phoneNo: 8181863273
        })
        .end((req, res) => {
            res.should.have.status(200);
            next();
        })
    })
    it('should give false when response is not comming from the controller', (next) => {
        chai.request(server)
        .post('/signup')
        .send({
            email: faker.internet.email(),
            password: "akas",
            phoneNo: 8181
        })
        .end((req, res) => {
            res.should.have.status(422);
            next();
        })
    })
    it('should give false when credential is not validated', (next) => {
        chai.request(server)
        .post('/signup')
        .send({
            email: "utak25il.com",
            password: "Akash",
            phoneNo: "8282"
        })
        .end((req, res) => {
            res.should.have.status(422);
            next();
        })
    })
    it('should give true when credential is validated', (next) => {
        chai.request(server)
        .post('/signup')
        .send({
            email: faker.internet.email(),
            password: "AKash@123",
            phoneNo: "8181863273"
        })
        .end((req, res) => {
            res.should.have.status(200);
            next();
        })
    })
    it('should give true when response is comming from service layer', (next) => {
        chai.request(server)
        .post('/signup')
        .send({
            email: faker.internet.email(),
            password: "Akash@123",
            phoneNo: "8181863273"
        })
        .end((req, res) => {
            res.should.have.status(200);
            next();
        })
    })
})
