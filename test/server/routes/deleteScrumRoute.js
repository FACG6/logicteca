const test = require('tape');
const request = require('supertest');
const connect = require('./../../../server/database/config/connection');
const app = require('./../../../server/app');

// query for dynamic test
const selectOneScrum = () => connect.query('select id from scrums LIMIT 1');

test('delete in /api/v1/scrums/:scrumID (with valid data)', (t) => {
  selectOneScrum()
    .then((res) => {
      if (res.rowCount !== 0) {
        return res.rows[0].id;
      }
      t.error();
      return false;
    })
    .then((scrumId) => {
      if (scrumId) {
        request(app)
          .delete(`/api/v1/scrums/${scrumId}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) {
              t.error(err);
            } else if (res.body.error) {
              t.error(res.body.error);
            } else {
              t.deepEqual(
                Object.keys(res.body.data),
                ['id', 'name', 'project_id'],
                'delete project and it users sucssfully',
              );
              t.end();
            }
          });
      }
    })
    .catch((error) => {
      t.error(error);
    });
});
test.onFinish(() => process.exit(0));
