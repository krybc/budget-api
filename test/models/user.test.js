let mongoose = require('mongoose');
let constants = require('../../src/config/constants');

const chai = require('chai');
const chaiHttp = require('chai-http');

let expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);

const UserTest = require('../../src/models/user');

let assert = require('assert');

describe('Model: User', () => {

  before(async () => {
    try {
      await mongoose.connect(constants.mongodb.url);
      await UserTest.remove({});
    } catch (err) {
      throw err;
    }
  });

  after(async () => {
    try {
      await UserTest.remove({});
      await mongoose.connection.close();
    } catch (err) {
      throw err;
    }
  });

  describe('create', () => {

    it('Should required email and password', async () => {
      const user = new UserTest();
      const { errors } = await user.validateSync();
      expect(errors.email.kind).to.equal('required');
      expect(errors.email.kind).to.equal('required');
    });

    it('Should add user with pass data', async () => {

      let user = {
        email: "foo@bar.com",
        firstName: "Test",
        lastName: "Test",
        password: "test"
      };

      const result = await UserTest.create(user);

      result.should.be.a('object');
      result.should.have.property('email');
      result.should.have.property('firstName');
      result.should.have.property('lastName');
      result.should.have.property('password');

    });

  });

  describe('update', () => {

    it('Should edit user with pass data', async () => {

/*      let user = {
        email: "foo@bar.com",
        firstName: "Kamil",
        lastName: "Rybczyński",
        password: "test"
      };*/

      const user = await UserTest.findOne({email: "foo@bar.com"});
      user.set({password: "dupa"});
      const result = await user.save();

      result.should.be.a('object');
      result.should.have.property('email');
      result.should.have.property('firstName');
      result.should.have.property('lastName');
      result.should.have.property('password');

    });

  });

  describe('delete', () => {

    it('Should delete user', async () => {

      //const result = await User.remove({email: "foo@bar.com"});

      //result.should.have.property('ok');
      //result.ok.should.be.equal(1);


    });

  });

});

