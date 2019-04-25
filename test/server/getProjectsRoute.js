const request = require('supertest');
const test = require('tape');
const app = require('../../server/app');

test('Request projects route', (t) => {
  request(app)
    .get('/api/v1/projects')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) {
        t.error(err);
      } else {
        const result = JSON.parse(res.text);
        t.deepEqual(Object.keys(result), ['data', 'error'], 'returned correct object structure');
        t.deepEqual(
          Object.keys(result.data[0]),
          ['id', 'name', 'description', 'created_at'],
          'returned correct data structure',
        );
        t.end();
      }
    });
});
