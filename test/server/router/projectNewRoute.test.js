const test = require('tape');
const request = require('supertest');
const connect = require('./../../../server/database/config/connection');
const app = require('./../../../server/app');
// query for dynamic test
const selectOneUser = () => connect.query('select id from users LIMIT 1');

test('post in /api/v1/projects/new (with valid data)', (t) => {
  selectOneUser()
    .then((res) => {
      if (res.rowCount !== 0) {
        return res.rows[0].id;
      }
      t.equal(res.rowCount === 0, true, 'there is no project in data base');
      t.end();
      return false;
    })
    .then((usersId) => {
      request(app)
        .post('/api/v1/projects/new')
        .send({
          name: 'logicteca',
          dsescription: 'Custom built task management system',
          row: [usersId],
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else if (res.text.error) {
            t.error(res.text.error);
          } else {
            t.equal(
              res.text.includes('add new project successfully'),
              true,
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
