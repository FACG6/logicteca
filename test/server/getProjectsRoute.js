const request = require('supertest');
const test = require('tape');
const app = require('../../server/app');

test('Request projects route', (t) => {
  request(app)
    .get('/api/v1/projects')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        //
        t.end();
      }
    });
});
