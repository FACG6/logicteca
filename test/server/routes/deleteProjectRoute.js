const request = require('supertest');
const test = require('tape');
const app = require('../../../server/app');
const connection = require('../../../server/database/config/connection');

connection
  .query('insert into projects (name, description) values ($1, $2) returning id', [
    'test1',
    'this is for test',
  ])
  .then((result) => {
    const projectId = result.rows[0].id;
    test('Request delete project route', (t) => {
      request(app)
        .delete(`/api/v1/projects/${projectId}`)
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBbmdoYW0xMTYiLCJyb2xlIjoiRGV2ZWxvcGVyIiwiaWF0IjoxNTU2NTM5ODA2fQ.LH9KjeeekNZ0PAogdB8qr3Ew7V6sz_Ih9cjLSOpVNN4',
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
          } else {
            const data = JSON.parse(res.text);
            t.deepEqual(data, { data: true, error: null }, 'project is deleted successfully');
            t.end();
          }
        });
    });
  })
  .catch(e => console.log(e));
