const connect = require('../config/connection');

const updateTask = (taskId, task) => {
  const taskToUpdate = Object.keys(task).map(value => task[value]);
  const updatedTask = { // 15
    text = `update tasks set action_type= $1, status=$2, modules=$3, description=$4, estimated_time=$5, spent_time=$6, priority=$7, initial_test_status=$8, ticket=$9, notes=$10, total_efforts=$11, date_to_commit=$12, review_and_test_note=$13, scrum_id=$14, assigned_to=$15 WHERE id = $16 RETURNING *`,
    values = [...taskToUpdate, taskId],
  };
  return connect.query(updatedTask)
};

module.exports = updateTask;