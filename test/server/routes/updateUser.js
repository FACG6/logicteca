const test = require('tape');
const supertest = require('supertest');
const app = require('../../../server/app');
const selectId = require('../../../server/database/queries/selectId');


test("testing 'api/v1/:userId' update route", (t) => {
  const newUserInfo = { user_name: 'Israa', full_name: 'Sulaiman', role: 'developer' };
  const columns = ['user_name', 'full_name', 'role'];
  selectId()
    .then(response => response.rows[0].id)
    .then((id) => {
      supertest(app)
        .put(`/api/v1/users/${id}`)
        .send(newUserInfo)
        .expect(200)
        .expect('content-type', /json/)
        .end((err, response) => {
          if (err) t.error(err);
          t.deepEqual(Object.keys(response.body.data), columns, 'should contain: id, username, fullname and role');
          t.end();
        });
    }).catch((err) => {
      t.error(err);
      t.end();
    });
});
