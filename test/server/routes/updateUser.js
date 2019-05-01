const test = require('tape');
const supertest = require('supertest');
const app = require('../../../server/app');
const selectId = require('../../../server/database/queries/selectId');

test("testing 'api/v1/:userId' update route", (t) => {
  const newUserInfo = { user_name: 'Israaa', full_name: 'Sulaiman', role: 'developer' };
  const columns = ['id', 'user_name', 'full_name', 'role'];
  selectId()
    .then(response => response.rows[0].id)
    .then((id) => {
      supertest(app)
        .put(`/api/v1/users/${id}`)
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBbmdoYW0xMTYiLCJyb2xlIjoiRGV2ZWxvcGVyIiwiaWF0IjoxNTU2NTM5ODA2fQ.LH9KjeeekNZ0PAogdB8qr3Ew7V6sz_Ih9cjLSOpVNN4',
        ])
        .send(newUserInfo)
        .expect(200)
        .expect('content-type', /json/)
        .end((err, response) => {
          if (err) t.error(err);
          t.deepEqual(
            Object.keys(response.body.data),
            columns,
            'should contain: id, username, fullname and role',
          );
          t.end();
        });
    })
    .catch((err) => {
      t.error(err);
      t.end();
    });
});
