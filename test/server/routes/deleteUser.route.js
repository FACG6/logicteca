const test = require('tape');
const supertest = require('supertest');
const app = require('../../../server/app');
const selectId = require('../../../server/database/queries/selectId');

test('testing /users/:userId, delete route', (t) => {
  selectId()
    .then((result) => {
      supertest(app)
        .delete(`/api/v1/users/${result.rows[0].id}`)
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBbmdoYW0xMTYiLCJyb2xlIjoiRGV2ZWxvcGVyIiwiaWF0IjoxNTU2NTM5ODA2fQ.LH9KjeeekNZ0PAogdB8qr3Ew7V6sz_Ih9cjLSOpVNN4',
        ])
        .expect(200)
        .expect('content-type', /json/)
        .end((err, response) => {
          if (err) t.error(err);
          t.equal(response.body.data, result.rows[0].id, 'should be equal');
          t.end();
        });
    })
    .catch((err) => {
      t.error(err);
      t.end();
    });
});
