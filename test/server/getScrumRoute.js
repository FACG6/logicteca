const test = require('tape');
const supertest = require('supertest');
const route = require('../../server/app');
const buildDB = require('../../server/database/config/dbBuild');
const connect = require('../../server/database/config/connection');
// buildDB();

const selectScrum = () => {
  const getScrums = {
    text: 'SELECT * from scrums',
  };
  return connect.query(getScrums);
};

// // selectScrum()
// //   .then(result => console.log(result.rows));

test('Testing for api/v1/scrums/:scrumId route', (t) => {
  // console.log(111111111111);
  const columns = ['id', 'name', 'project_id', 'action_type', 'status', 'modules', 'description', 'estimated_time', 'spent_time', 'priority', 'initial_test_status', 'ticket', 'notes', 'total_efforts', 'date_to_commit', 'review_and_test_note', 'scrum_id', 'assigned_to'];
  selectScrum()
    .then((result) => {
      // console.log(1111, result);
      console.log(222, result.rows[0]);
      // console.log(222, result.rows[0].id);
      const { id } = result.rows[0];
      console.log(333, id);
      supertest(route)
        .get(`api/v1/scrums/${id}`)
        .expect('content-type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.log(8888, err);
            t.error(err);
            t.end();
          } else {
            console.log(9999999, console.log(res.body));
            // t.deepEqual(typeof res.body, 'Object', 'Shoud return type of the body is object');
            t.end();
          }
        });
    })
    .catch(err => console.log(555, err));
});
