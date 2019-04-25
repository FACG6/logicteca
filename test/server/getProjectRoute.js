const request = require('supertest');
const test = require('tape');
const app = require('../../server/app');
const connection = require('../../server/database/config/connection');

connection
  .query('select * from projects limit 1')
  .then((result) => {
    const projectId = result.rows[0].id;

    test('Request projects route', (t) => {
      request(app)
        .get(`/api/v1/projects/${projectId}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else {
            const data = JSON.parse(res.text);
            console.log(data);

            t.end();
          }
        });
    });
  })
  .catch(e => console.log(e));
