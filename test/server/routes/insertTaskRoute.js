const test = require('tape');
const supertest = require('supertest');
const route = require('../../../server/app');
const connect = require('../../../server/database/config/connection');

const selectUserScrumProj = () => {
  const getUser = 'select scrums.project_id, scrums.id as scrum_id, users.full_name, users.id as user_id from scrums inner join users_projects on scrums.project_id = users_projects.project_id inner join users on users.id = users_projects.user_id limit 1';
  return connect.query(getUser);
};

test('Testing for api/v1/tasks/new route', (t) => {
  const fields = [
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
  ];
  const newTask = {
    action_type: 'CLIENT',
    status: 'coding',
    modules: 'General',
    description:
      'Create new DB schema rami_test copy from Ahmed DB for Rami to make a report with DB issues',
    estimated_time: 10,
    spent_time: 6,
    priority: 1,
    initial_test_status: null,
    ticket: 'http://bugnet.logicteca.com/BugNETv-2/Issues/IssueDetail.aspx?id=11650',
    notes: 'discuss with mohammed & fayek',
    total_efforts: 5,
    date_to_commit: '12-12-2019',
    review_and_test_note: null,
  };
  selectUserScrumProj()
    .then((result) => {
      newTask.scrum_id = result.rows[0].scrum_id;
      newTask.assigned_to = result.rows[0].full_name;
    })
    .then(() => {
      supertest(route)
        .post('/api/v1/tasks/new')
        .set('Cookie', [
          'jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJBbmdoYW0xMTYiLCJyb2xlIjoiRGV2ZWxvcGVyIiwiaWF0IjoxNTU2NTM5ODA2fQ.LH9KjeeekNZ0PAogdB8qr3Ew7V6sz_Ih9cjLSOpVNN4',
        ])
        .send(newTask)
        .expect(200)
        .expect('content-type', /json/)
        .end((err, res) => {
          if (err) {
            t.error(err);
            t.end();
          } else {
            t.deepEqual(Object.keys(res.body.data[0]), fields, 'Should contain the same fields');
            t.end();
          }
        });
    })
    .catch((err) => {
      t.error(err);
      t.end();
    });
});
