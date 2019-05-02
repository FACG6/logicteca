const test = require('tape');
const request = require('supertest');
const connect = require('./../../../server/database/config/connection');
const app = require('./../../../server/app');

// query for dynamic test
const selectOneTask = () => connect.query('select id from tasks LIMIT 1');

test('delete in /api/v1/tasks/:taskId (with valid data)', (t) => {
  selectOneTask()
    .then((res) => {
      if (res.rowCount !== 0) {
        return res.rows[0].id;
      }
      t.error();
      return false;
    })
    .then((taskId) => {
      if (taskId) {
        request(app)
          .delete(`/api/v1/tasks/${taskId}`)
          .set('Cookie', [
            'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBbmdoYW0xMTYiLCJyb2xlIjoiRGV2ZWxvcGVyIiwiaWF0IjoxNTU2NTM5ODA2fQ.LH9KjeeekNZ0PAogdB8qr3Ew7V6sz_Ih9cjLSOpVNN4',
          ])
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) {
              t.error(err);
            } else if (res.body.error) {
              t.error(res.body.error);
            } else {
              t.deepEqual(Object.keys(res.body.data), ['id'], 'delete task sucssfully');
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
