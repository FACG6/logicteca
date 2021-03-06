const test = require('tape');
const supertest = require('supertest');

const app = require('../../../server/app');

test('testing /api/v1/users/new; case1: success', (t) => {
  const user = {
    user_name: 'Angham1166',
    full_name: 'Angham Abed',
    role: 'Developer',
    password: '123556',
  };
  const keys = ['id', 'user_name', 'full_name', 'role'];
  supertest(app)
    .post('/api/v1/users/new')
    .set('Cookie', [
      'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBbmdoYW0xMTYiLCJyb2xlIjoiRGV2ZWxvcGVyIiwiaWF0IjoxNTU2NTM5ODA2fQ.LH9KjeeekNZ0PAogdB8qr3Ew7V6sz_Ih9cjLSOpVNN4',
    ])
    .send(user)
    .expect(200)
    .expect('content-type', /json/)
    .end((err, response) => {
      if (err) t.error(err);
      t.equal(response.error, false, 'should be null');
      t.deepEqual(
        Object.keys(response.body.data),
        keys,
        'should contain id, role, user_name, full_name',
      );
      t.end();
    });
});

test('testing /api/v1/users/new, case2: username is already taken', (t) => {
  const user = {
    user_name: 'Angham1166',
    full_name: 'israa sulaiman',
    role: 'Developer',
    password: 'Angh12345678',
  };
  const error = 'UserName is already taken';
  supertest(app)
    .post('/api/v1/users/new')
    .set('Cookie', [
      'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBbmdoYW0xMTYiLCJyb2xlIjoiRGV2ZWxvcGVyIiwiaWF0IjoxNTU2NTM5ODA2fQ.LH9KjeeekNZ0PAogdB8qr3Ew7V6sz_Ih9cjLSOpVNN4',
    ])
    .send(user)
    .expect(401)
    .expect('content-type', /json/)
    .end((err, response) => {
      if (err) t.error(err);
      t.deepEqual(response.body.error.msg, error, 'User name is already taken');
      t.end();
    });
});

// This test will be edited after making the route to handle validation error//

test('testing /api/v1/users/new, case3: validation', (t) => {
  const user = {
    user_name: 'Esraa',
    full_name: 'Esraa sulaiman',
    role: 'Developer',
    password: '123',
  };
  supertest(app)
    .post('/api/v1/users/new')
    .set('Cookie', [
      'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBbmdoYW0xMTYiLCJyb2xlIjoiRGV2ZWxvcGVyIiwiaWF0IjoxNTU2NTM5ODA2fQ.LH9KjeeekNZ0PAogdB8qr3Ew7V6sz_Ih9cjLSOpVNN4',
    ])
    .send(user)
    .expect(422)
    .expect('content-type', /json/)
    .end((err, response) => {
      if (err) t.error(err);
      else t.equal(response.body.message, 'Validation Error', 'validation error');
      t.end();
    });
});
