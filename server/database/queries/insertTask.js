const connection = require('../config/connection');

module.exports = (task) => {
  const queryValues = Object.keys(task).map(filed => task[filed]);
  const queryObj = {
    text: 'insert into tasks (action_type, status, modules, description, estimated_time, spent_time, priority, initial_test_status, ticket, notes, total_efforts, date_to_commit, review_and_test_note, scrum_id, assigned_to) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *',
    values: [...queryValues],
  };
  return connection.query(queryObj);
};
