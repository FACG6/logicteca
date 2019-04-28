const test = require('tape');
const request = require('supertest');
const connect = require('../../../server/database/config/connection');
const app = require('../../../server/app');
// query for dynamic test
const selectOneUser = () => connect.query('select id from scrums LIMIT 1');

test('put in /api/v1/scrums/:scrumId (with valid data)', (t) => {
  selectOneUser()
    .then((res) => {
      if (res.rowCount !== 0) {
        console.log(res.rows[0].id.toString());
        return res.rows[0].id;
      }
      t.error();
      return false;
    })
    .then((scrumId) => {
      request(app)
        .put(`/api/v1/scrums/${scrumId}`)
        .send({ name: 'scrum 5' })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else if (res.text.error) {
            t.error(res.text.error);
          } else {
            t.deepEqual(
              Object.keys(res.body.data),
              ['id', 'name', 'project_id'],
              'add project and it users sucssfully',
            );
            t.end();
          }
        });
    })
    .catch((error) => {
      t.error(error);
    });
});
test.onFinish(() => process.exit(0));
