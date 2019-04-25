const test = require('tape');
const supertest = require('supertest');
const app = require('../../server/app');

test('testing /users/:userId', (t) => {
  const id = '03e2e330-141a-4bf5-baaf-bb2b6390718c';
  supertest(app)
    .delete(`/api/v1/users/${id}`)
    .expect(200)
    .expect('content-type', /json/)
    .end((err, response) => {
      if (err) t.error(err);
      t.equal(response.body.data, id, 'should be equal');
    });
  t.end();
});
