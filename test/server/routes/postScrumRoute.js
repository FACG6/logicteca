const request = require('supertest');
const test = require('tape');
const app = require('../../../server/app');
const connection = require('../../../server/database/config/connection');

connection
  .query('select id from projects limit 1')
  .then((ress) => {
    const projectId = ress.rows[0].id;
    if (projectId) {
      return projectId;
    }
    throw new Error('no projects found!!');
  })
  .then((projectId) => {
    test('Post new scrum route', (t) => {
      request(app)
        .post('/api/v1/scrums/new')
        .send({
          projectId,
          scrumName: 'demo3',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else {
            const result = res.body;
            t.deepEqual(
              Object.keys(result),
              ['data', 'error'],
              'response shuold contain data and error keys',
            );
            t.deepEqual(
              Object.keys(result.data),
              ['id', 'name', 'project_id'],
              'response shuold contain id, name and project_id keys',
            );

            t.end();
          }
        });
    });
  })
  .catch(e => console.log(e));
