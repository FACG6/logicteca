const connection = require('../config/connection');

module.exports = (task) => {
  const {
    description,
    action_type,
    status,
    priority,
    assigned_to,
    estimated_time,
    notes,
    initial_test_status,
    modules,
    spent_time,
    ticket,
    scrum_id,
  } = task;

  const queryObj = {
    text:
      'insert into tasks (action_type, status, description, estimated_time, spent_time, priority, ticket, assigned_to, scrum_id, notes, modules, initial_test_status) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
    values: [
      action_type,
      status,
      description,
      estimated_time,
      spent_time,
      priority,
      ticket,
      assigned_to,
      scrum_id,
      modules,
      notes,
      initial_test_status,
    ],
  };
  return connection.query(queryObj);
};
