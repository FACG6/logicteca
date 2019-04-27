const test = require('tape');
const request = require('supertest');
const connect = require('../../../server/database/config/connection');
const app = require('../../../server/app');
// query for dynamic test
const selectOneProject = () => connect.query('select id from projects LIMIT 1');
const selectOneUser = () => connect.query('select id from users LIMIT 1');

test('post in /api/v1/projects/:projectId (with valid data)', (t) => {
  Promise.all([selectOneProject(), selectOneUser()])
    .then((res) => {
      if (res.rowCount !== 0) {
        return { projectId: res[0].rows[0].id, userId: res[1].rows[0].id };
      }
      t.equal(res.rowCount === 0, true, 'there is no project in data base');
      t.end();
      return false;
    })
    .then((Ids) => {
      const { projectId, userId } = Ids;
      request(app)
        .put(`/api/v1/projects/${projectId}`)
        .send({
          name: 'logicteca',
          dsescription: 'Custom built task management system',
          row: [userId],
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          // console.log(res.text)
          if (err) {
            t.error(err);
          } else if (res.text.error) {
            t.error(res.text.error);
          } else {
            t.deepEqual(
              Object.keys(res.body.data),
              ['id', 'project_id', 'user_id'],
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
