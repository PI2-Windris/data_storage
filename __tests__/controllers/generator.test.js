const request = require('supertest');
const app = require('../../src/index');
const generators = require('../../src/models/generator');
const dbHandler = require('../db');

describe('GET ALL await generators', () => {
  it('GETS ALL await generators', async (done) => {
    const response = await request(app)
    .get('/generator')
    .expect(200)
    done();
  });

  it('GETS SPECIFIC GENERATOR', async (done) => {
    const generator = await generators.findOne().sort({ date: -1 }).limit(1);
    const response = await request(app)
    .get(`/generator/${generator._id}`)
    .expect(200)
    done();
  });

  it('CREATES GENERATOR GENERATOR', async (done) => {
    const response = await request(app)
    .post(`/generator`)
    .send({userId: "123", generatorId: "12345"})
    .expect(200)
    done();
  });


  it('GETS SPECIFIC GENERATOR CLIMATE DATA', async (done) => {
    const generator = await generators.findOne().sort({ date: -1 }).limit(1);
    const response = await request(app)
    .get(`/generator/${generator._id}/climate`)
    .expect(200)
    done();
  });

  it('GETS SPECIFIC GENERATOR ENERGY DATA', async (done) => {
    const generator = await generators.findOne().sort({ date: -1 }).limit(1);
    const response = await request(app)
    .get(`/generator/${generator._id}/energy`)
    .expect(200)
    done();
  });

  it('GETS SPECIFIC GENERATOR CLIMATE DATA AS CSV', async (done) => {
    const generator = await generators.findOne().sort({ date: -1 }).limit(1);
    const response = await request(app)
    .get(`/generator/${generator._id}/climate`)
    .query({
      format: "csv"
    })
    .expect('Content-Type', 'text/csv; charset=utf-8')
    .expect(200)
    done();
  });

  it('GETS SPECIFIC GENERATOR ENERGY DATA AS CSV', async (done) => {
    const generator = await generators.findOne().sort({ date: -1 }).limit(1);
    const response = await request(app)
    .get(`/generator/${generator._id}/energy`)
    .query({
      format: "csv"
    })
    .expect('Content-Type', 'text/csv; charset=utf-8')
    .expect(200)
    done();
  });


  it('GETS USER await generators', async (done) => {
    const generator = await generators.findOne().sort({ date: -1 }).limit(1);
    const response = await request(app)
    .get(`/generator/user/${generator.userId}`)
    .expect(200)
    done();
  });

  it('GETS USER CLIMATE DATA', async (done) => {
    const generator = await generators.findOne().sort({ date: -1 }).limit(1);
    const response = await request(app)
    .get(`/generator/user/${generator.userId}/climate`)
    .expect(200)
    done();
  });

  it('GETS USER ENERGY DATA', async (done) => {
    const generator = await generators.findOne().sort({ date: -1 }).limit(1);
    const response = await request(app)
    .get(`/generator/user/${generator.userId}/climate`)
    .expect(200)
    done();
  });
}); 