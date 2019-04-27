const test = require('tape');
const supertest = require('supertest');
const route = require('../../../server/app');
const connect = require('../../../server/database/config/connection');
const insertTask = require('../../../server/database/queries/insertTask');

const selectUser = () => {
  const getUser = 'SELECT * FROM users_projects join projects ON projects.id = users_projects.project_id';
  return connect.query(getUser);
};

selectUser()
  .then(results => console.log(777, results.rows))
  .catch(err => console.log(err));

// test('Testing for api/v1/tasks/new route', (t) => {
//   const fields = ['action_type', 'status', 'modules', 'description', 'estimated_time', 'spent_time', 'priority', 'initial_test_status', 'ticket', 'notes', 'total_efforts', 'date_to_commit', 'review_and_test_note', 'scrum_id', 'assigned_to'];
//   let newTask = {
//     action_type: 'CLIENT',
//     status: 'coding',
//     modules: 'General',
//     description: 'Create new DB schema rami_test copy from Ahmed DB for Rami to make a report with DB issues',
//     estimated_time: 10,
//     spent_time: 6,
//     priority: 1,
//     initial_test_status: null,
//     ticket: 'http://bugnet.logicteca.com/BugNETv-2/Issues/IssueDetail.aspx?id=11650',
//     notes: 'discuss with mohammed & fayek',
//     total_efforts: 5,
//     date_to_commit: '12-12-2019',
//     review_and_test_note: null,
//   };
//   selectUser()
//     // .then(result => newTask.scrum_id = result.rows[0].id)
//     .then(() => {
//       return selectUser()
//         .then(resss => console.log(444, resss))
//         .then(response => newTask.assigned_to = response.rows[0])
//         .catch((err) => {
//           t.error(err);
//           t.end();
//         });
//     })
//     // .then(() => console.log(999, newTask))
//     .then(() => {
//       supertest(route)
//         .post('/api/v1/tasks/new')
//         .send(newTask)
//         .expect(200)
//         .expect('content-type', /json/)
//         .end((err, res) => {
//           console.log(555, res.body);
//           if (err) {
//             t.error(err);
//             t.end();
//           } else {
//             // t.deepEqual(Object.keys(res.body[0]), fields, 'Should contain the same fields');
//             t.end();
//           }
//         });
//     })
//     .catch((err) => {
//       t.error(err);
//       t.end();
//     });
    
// });
