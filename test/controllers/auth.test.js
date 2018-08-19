let mongoose = require('mongoose');
let chai = require('chai');
let chaiHttp = require('chai-http');

let server = require('../../src/server');
let User = require('../../src/models/user');

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
    } catch (err) {
      throw err;
    }
  });

  after(async () => {
    try {
      await User.remove({});
      await mongoose.connection.close();
    } catch (err) {
      throw err;
    }
  });

  describe('POST /auth/signup', function() {

    it('Should signup with invalid data', async () => {

      try {
        let res = await chai.request(server)
          .post('/auth/signup')
          .send({...user, email: 'foobar'});

        res.should.have.status(400);
      } catch (e) {
        throw e;
      }

    });

    it('Should signup with pass data', async () => {

      try {
        let res = await chai.request(server)
          .post('/auth/signup')
          .send(user);

        res.should.have.status(200);
      } catch (e) {
        throw e;
      }

    });

  });

  describe('POST /auth/signin', function() {

    it('Should signin without password', async () => {

      try {
        let res = await chai.request(server)
          .post('/auth/signin')
          .send({email: user.email});

        res.should.have.status(400);
      } catch (e) {
        throw e;
      }

    });

    it('Should signin with pass data', async () => {

      try {
        let res = await chai.request(server)
          .post('/auth/signin')
          .send({email: user.email, password: user.password});

        res.should.have.status(200);
        res.body.should.have.property('token');
      } catch (e) {
        throw e;
      }

    });

  });

});

