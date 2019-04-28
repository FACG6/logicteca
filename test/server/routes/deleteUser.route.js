const test = require('tape');
const supertest = require('supertest');
const app = require('../../../server/app');
const selectId = require('../../../server/database/queries/selectId');


test('testing /users/:userId, delete route', (t) => {
  selectId()
    .then((result) => {
      supertest(app)
        .delete(`/api/v1/users/${result.rows[0].id}`)
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
