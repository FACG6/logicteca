const connection = require('../config/connection');

module.exports = (task) => {
  const {
    task_description,
    action_type,
    status,
    priority,
    assigned_to,
    estimate_time,
    spent_time,
    ticket,
    scrum_id,
  } = task;

  const queryObj = {
    text:
      'insert into tasks (action_type, status, description, estimated_time, spent_time, priority, ticket, assigned_to, scrum_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    values: [
      action_type,
      status,
      task_description,
      estimate_time,
      spent_time,
      priority,
      ticket,
      assigned_to,
      scrum_id,
    ],
  };
  return connection.query(queryObj);
};
