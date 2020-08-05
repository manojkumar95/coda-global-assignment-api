const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./bootstrap-test.js');
const fixtures = require('./fixtures.json');
const should = chai.should();

chai.use(chaiHttp);


describe('Users', () => {

  describe('/POST user', () => {
    it('it should not POST user without valid user id field', (done) => {
      chai.request(app)
        .post('/api/user/update')
        .send(fixtures.invalidUser)
        .end((err, res) => {
            res.should.have.status(412);
            res.body.should.be.a('object');
            res.body.should.have.property('status');
            res.body.should.have.property('error');
          done();
        });
    });
  });

  describe('/GET user', () => {

    it('it should GET the first user', (done) => {
      chai.request(app)
        .get('/api/user')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});