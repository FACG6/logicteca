const test = require('tape');
const supertest = require('supertest');
const app = require('../../../server/app');


test("testing '/users' route", (t) => {
  const columns = ['id', 'user_name', 'full_name', 'role'];
  supertest(app)
    .get('/api/v1/users')
    .expect(200)
    .expect('content-type', /json/)
    .end((err, response) => {
      if (err) t.error(err);
      t.deepEqual(Object.keys(response.body[0]), columns, 'should contain: id, username, fullname and role');
      t.end();
    });
});
