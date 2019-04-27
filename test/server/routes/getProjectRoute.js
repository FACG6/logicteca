const request = require('supertest');
const test = require('tape');
const app = require('../../../server/app');
const connection = require('../../../server/database/config/connection');

connection
  .query('select * from projects limit 1')
  .then((result) => {
    const projectId = result.rows[0].id;
    test('Request project route', (t) => {
      request(app)
        .get(`/api/v1/projects/${projectId}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else {
            t.deepEqual(
              Object.keys(res.body),
              ['data', 'error'],
              'should return object of two main keys',
            );
            t.deepEqual(
              Object.keys(res.body.data),
              ['id', 'name', 'description', 'created_at', 'user_id'],
              'should return all data keys',
            );
            t.equal(res.body.error, null, 'should return null in error key');
            t.end();
          }
        });
    });
  })
  .catch(e => console.log(e));
