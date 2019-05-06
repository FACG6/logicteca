const test = require('tape');
const supertest = require('supertest');
const route = require('../../../server/app');
const connect = require('../../../server/database/config/connection');

const selectScrum = () => {
  const getScrums = {
    text: 'SELECT * from scrums',
  };
  return connect.query(getScrums);
};

test('Testing for /api/v1/scrums/:scrumId route', (t) => {
  const columns = [
    'id',
    'action_type',
    'status',
    'modules',
    'description',
    'estimated_time',
    'spent_time',
    'priority',
    'initial_test_status',
    'ticket',
    'notes',
    'total_efforts',
    'date_to_commit',
    'review_and_test_note',
    'scrum_id',
    'assigned_to',
    'name',
  ];
  selectScrum()
    .then((result) => {
      const { id } = result.rows[0];
      supertest(route)
        .get(`/api/v1/scrums/${id}`)
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBbmdoYW0xMTYiLCJyb2xlIjoiRGV2ZWxvcGVyIiwiaWF0IjoxNTU2NTM5ODA2fQ.LH9KjeeekNZ0PAogdB8qr3Ew7V6sz_Ih9cjLSOpVNN4',
        ])
        .expect('content-type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            t.error(err);
            t.end();
          } else {
            t.deepEqual(
              Object.keys(res.body.data[0]),
              columns,
              'Should return the same content of columns',
            );
            t.end();
          }
        });
    })
    .catch((err) => {
      t.error(err);
      t.end();
    });
});
