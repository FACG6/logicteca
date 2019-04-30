const test = require('tape');
const supertest = require('supertest');
const app = require('../../../server/app');

test("testing 'api/v1/users' route", (t) => {
  const columns = ['id', 'user_name', 'full_name', 'role'];
  supertest(app)
    .get('/api/v1/users')
    .set('Cookie', [
      'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBbmdoYW0xMTYiLCJyb2xlIjoiRGV2ZWxvcGVyIiwiaWF0IjoxNTU2NTM5ODA2fQ.LH9KjeeekNZ0PAogdB8qr3Ew7V6sz_Ih9cjLSOpVNN4',
    ])
    .expect(200)
    .expect('content-type', /json/)
    .end((err, response) => {
      if (err) t.error(err);
      t.deepEqual(
        Object.keys(response.body.data[0]),
        columns,
        'should contain: id, username, fullname and role',
      );
      t.end();
    });
});
