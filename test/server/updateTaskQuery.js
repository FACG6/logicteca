const test = require('tape');
const connect = require('../../server/database/config/connection');

const selectOneScrum = () => connect.query('select * from scrums inner join users_projects on users_projects.project_id = scrums.project_id limit 1');

const insertOneTask = (task) => {
  const taskToInsert = Object.keys(task).map(value => task[value]);
  const insertedTask = {
    text: 'insert into tasks(action_type, status, modules, description, estimated_time, spent_time, priority, initial_test_status, ticket, notes, total_efforts, date_to_commit, review_and_test_note, assigned_to, scrum_id) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',
    values: [...taskToInsert],
  };
  return connect.query(insertedTask);
};

const updateTask = (task, scrumId, taskId) => {
  const taskToUpdate = Object.keys(task).map(value => task[value]);
  const updatedTask = {
    text: 'update tasks set action_type= $1, status=$2, modules=$3, description=$4, estimated_time=$5, spent_time=$6, priority=$7, initial_test_status=$8, ticket=$9, notes=$10, total_efforts=$11, date_to_commit=$12, review_and_test_note=$13, assigned_to=$14 WHERE scrum_id=$15 and id = $16 RETURNING *',
    values: [...taskToUpdate, scrumId, taskId],
  };
  return connect.query(updatedTask);
};

test('Testing for updateTask query function', (t) => {
  let newTask = {
    action_type: null,
    status: 'coding',
    modules: 'general',
    description: 'update task1',
    estimated_time: null,
    spent_time: null,
    priority: null,
    initial_test_status: null,
    ticket: null,
    notes: null,
    total_efforts: null,
    date_to_commit: null,
    review_and_test_note: null,
    // assigned_to: 1,
  };
  selectOneScrum()
    .then((res) => {
      const { id, user_id} = res.rows[0];
      newTask.scrum_id = id;
      newTask.assigned_to = user_id;
    })
    .then(() => insertOneTask(newTask))
    .then(res => console.log(444, res.rows[0]))
    .catch(err => console.log(err));
  // t.end();
});


// users_projects.project_id, users_projects.user_id//  users_projects  scrums.project_id
// selectOneScrum()
//   .then(res => console.log(res.rows[0]))
//   .catch(err => console.log(err));


// insertNewTask(newTask)
//   .then(res => console.log(111, res.rows))
//   .catch(err => console.log(222, err));
