const chai = require('chai');
const chaiHttp = require('chai-http');

let expect = chai.expect;
let should = chai.should();
chai.use(chaiHttp);

const User = require('../../src/models/user');

let assert = require('assert');

describe('Model: User', (done) => {

  before(async () => {
    try {
      await User.remove({});
    } catch (err) {
      console.log(err);
      done(err);
    }
  });

  after(async () => {
    try {
      await User.remove({});
    } catch (err) {
      console.log(err);
      done(err);
    }
  });

  describe('#save()', () => {

    it('Should required email and password', async () => {
      const user = new User();
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

      const result = await User.create(user);

      result.should.be.a('object');
      result.should.have.property('email');
      result.should.have.property('firstName');
      result.should.have.property('lastName');
      result.should.have.property('password');

    });

  });

  describe('PUT /auth/update', () => {

    it('Should edit user with pass data', async () => {

/*      let user = {
        email: "foo@bar.com",
        firstName: "Kamil",
        lastName: "Rybczyński",
        password: "test"
      };*/

      const user = await User.findOne({email: "foo@bar.com"});
      user.set({password: "dupa"});
      const result = await user.save();

      result.should.be.a('object');
      result.should.have.property('email');
      result.should.have.property('firstName');
      result.should.have.property('lastName');
      result.should.have.property('password');

    });

  });

  describe('DELETE /auth/delete', () => {

    it('Should delete user', async () => {

      //const result = await User.remove({email: "foo@bar.com"});

      //result.should.have.property('ok');
      //result.ok.should.be.equal(1);


    });

  });

});

