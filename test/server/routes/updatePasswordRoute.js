const test = require('tape');
const supertest = require('supertest');
const app = require('../../../server/app');
const selectId = require('../../../server/database/queries/selectId');

test("testing 'api/v1/:userId/new-password' updatePassword route", (t) => {
  const newPassword = { password: 'israa96sulaiman' };
  selectId()
    .then(response => response.rows[0].id)
    .then((id) => {
      supertest(app)
        .put(`/api/v1/users/${id}/new-password`)
        .send(newPassword)
        .expect(200)
        .expect('content-type', /json/)
        .end((err, response) => {
          if (err) t.error(err);
          t.deepEqual(response.body.data, 'success', 'data should be "success"');
          t.end();
        });
    }).catch((err) => {
      t.error(err);
      t.end();
    });
});

//This test 

test("testing 'api/v1/:userId/new-password' updatePassword route invalid", (t) => {
  const newPassword = { password: '112' };
  selectId()
    .then(response => response.rows[0].id)
    .then((id) => {
      supertest(app)
        .put(`/api/v1/users/${id}/new-password`)
        .send(newPassword)
        .expect(500)
        .expect('content-type', /html/)
        .end((err) => {
          if (err) t.error(err);
          t.end();
        });
    }).catch((err) => {
      t.error(err);
      t.end();
    });
});

//This test will be edited//

test("testing 'api/v1/:userId/new-password' updatePassword route invalid", (t) => {
  const newPassword = { password: '112israa' };
  supertest(app)
    .put('/api/v1/users/100/new-password')
    .send(newPassword)
    .expect(500)
    .expect('content-type', /html/)
    .end((err) => {
      if (err) t.error(err);
      t.end();
    });
});
