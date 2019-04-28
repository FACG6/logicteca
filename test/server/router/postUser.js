const test = require('tape');
const supertest = require('supertest');

const app = require('../../../server/app');

test('testing /api/v1/users/new; case1: success', (t) => {
  const user = {
    user_name: 'Ayman',
    full_name: 'Ayman al...',
    role: 'developer',
    password: '123556',
  };
  const keys = [
    'id',
    'user_name',
    'full_name',
    'role',
  ];
  supertest(app)
    .post('/api/v1/users/new')
    .send(user)
    .expect(200)
    .expect('content-type', /json/)
    .end((err, response) => {
      if (err) t.error(err);
      t.equal(response.error, false, 'should be null');
      t.deepEqual(Object.keys(response.body.data), keys, 'should contain id, role, user_name, full_name');
      t.end();
    });
});

test('testing /api/v1/users/new, case2: username is already taken', (t) => {
  const user = {
    user_name: 'israa',
    full_name: 'israa sulaiman',
    role: 'developer',
    password: '123556',
  };
  const error = 'UserName is already taken';
  supertest(app)
    .post('/api/v1/users/new')
    .send(user)
    .expect(422)
    .expect('content-type', /json/)
    .end((err, response) => {
      if (err) t.error(err);
      t.deepEqual(response.body.error.msg, error, 'User name is already taken');
      t.end();
    });
});

//This test will be edited after making the route to handle validation error//

test('testing /api/v1/users/new, case3: validation', (t) => {
  const user = {
    user_name: 'isra',
    full_name: 'israa sulaiman',
    role: 'developer',
    password: '123',
  };
  supertest(app)
    .post('/api/v1/users/new')
    .send(user)
    .expect(500)
    .expect('content-type', /html/)
    .end((err) => {
      if (err) t.error(err);
      t.end();
    });
});
