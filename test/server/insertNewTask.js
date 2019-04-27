const test = require('tape');
const insertTasks = require('../../server/database/queries/insertTask');
const connect = require('../../server/database/config/connection');

const selectScrum = () => {
  const getScrums = {
    text: 'SELECT * from scrums limit 1',
  };
  return connect.query(getScrums);
};

test('Testing insertTask query function', (t) => { 
  const columns = ['id', 'action_type', 'status', 'modules', 'description', 'estimated_time', 'spent_time', 'priority', 'initial_test_status', 'ticket', 'notes', 'total_efforts', 'date_to_commit', 'review_and_test_note', 'scrum_id', 'assigned_to'];
  let newTask = {
    action_type: null,
    status: null,
    modules: null,
    description: 'create queries db',
    estimated_time: null,
    spent_time: null,
    priority: 1.5,
    initial_test_status: null,
    ticket: 'url for ticket',
    notes: 'no notes',
    total_efforts: 20,
    date_to_commit: null,
    review_and_test_note: 'no notes',
    assigned_to: 1,
  };
  selectScrum()
    // .then(res => console.log(111, res.rows[0].id))
    .then(res => newTask.scrum_id = res.rows[0].id)
    .then(() => {
      // console.log(222, newTask);
      insertTasks(newTask)
        .then((result) => {
          // console.log(333, result.rows[0]);
          t.deepEqual(Object.keys(result.rows[0]), columns, 'Should return the row of the task');
          t.end();
        })
        .catch((err) => {
          t.error(err);
          t.end();
        });
    })
    .catch((err) => {
      t.error(err);
      t.end();
    });
});
