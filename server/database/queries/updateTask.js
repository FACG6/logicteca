const connect = require('../config/connection');

const updateTask = (task, taskId) => {
  const {
    action_type,
    status, modules,
    description,
    estimated_time,
    spent_time,
    priority,
    initial_test_status,
    ticket,
    notes,
    total_efforts,
    date_to_commit,
    review_and_test_note,
    assigned_to,
    scrum_id
  } = task;
  const updatedTask = {
    text: 'update tasks set action_type= $1, status=$2, modules=$3, description=$4, estimated_time=$5, spent_time=$6, priority=$7, initial_test_status=$8, ticket=$9, notes=$10, total_efforts=$11, date_to_commit=$12, review_and_test_note=$13, assigned_to=$14, scrum_id = $15 WHERE tasks.id=$16 RETURNING *',
    values: [
      action_type,
      status,
      modules,
      description,
      estimated_time,
      spent_time,
      priority,
      initial_test_status,
      ticket,
      notes,
      total_efforts,
      date_to_commit,
      review_and_test_note,
      assigned_to,
      scrum_id,
      taskId
    ],
  };
  return connect.query(updatedTask);
};

module.exports = updateTask;
