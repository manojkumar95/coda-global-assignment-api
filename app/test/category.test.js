const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./bootstrap-test.js');
const fixtures = require('./fixtures.json');
const should = chai.should();

chai.use(chaiHttp);


describe('Categories', () => {

  describe('/POST category', () => {
    it('it should POST category with name field', (done) => {
      chai.request(app)
        .post("/api/category/create")
        .send(fixtures.validCategory)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('category');
          done();
        });
    });
  });

  describe('/POST category', () => {
    it('it should not POST category without name field', (done) => {
      chai.request(app)
        .post("/api/category/create")
        .send(fixtures.invalidCategory)
        .end((err, res) => {
          res.should.have.status(412);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          done();
        });


    });
  });

  describe('/GET categories', () => {

    it('it should GET all the categories', (done) => {
      chai.request(app)
        .get('/api/categories')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status');
          res.body.should.have.property('categories');
          done();
        });
    });
  });
});