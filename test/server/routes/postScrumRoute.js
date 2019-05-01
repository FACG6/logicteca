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
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBbmdoYW0xMTYiLCJyb2xlIjoiRGV2ZWxvcGVyIiwiaWF0IjoxNTU2NTM5ODA2fQ.LH9KjeeekNZ0PAogdB8qr3Ew7V6sz_Ih9cjLSOpVNN4',
        ])
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
