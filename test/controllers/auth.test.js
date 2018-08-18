process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let User = require('../../src/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../src/index');
let should = chai.should();

chai.use(chaiHttp);

let assert = require('assert');

describe('Controller: Auth', function () {

  let user = {
    email: 'foo@bar.com',
    firstName: "Foo",
    lastName: "Bar",
    password: "test"
  };

  before(async () => {
    try {
      await User.remove({});
      done();
    } catch (err) {
      done(err);
    }
  });

  after(async () => {
    try {
      await User.remove({});
      done();
    } catch (err) {
      done(err);
    }
  });

  describe('POST /auth/signup', function() {

    it('Should signup with invalid data', async () => {

      chai.request(server)
        .post('/auth/signup')
        .send({...user, email: 'foobar'})
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });

    });

    it('Should signup with pass data', async () => {

      chai.request(server)
        .post('/auth/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });

    });

  });

  describe('POST /auth/signin', function() {

    it('Should signin without password', async () => {

      chai.request(server)
        .post('/auth/signin')
        .send({email: user.email})
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });

    });

    it('Should signin with pass data', async () => {

      chai.request(server)
        .post('/auth/signin')
        .send({email: user.email, password: user.password})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('token');
          done();
        });

    });

  });

});

