const connect = require('./../config/connection');

const selectProjectDetails = projectID => connect.query(
  'SELECT projects.*, user_id, full_name FROM  users_projects INNER JOIN projects ON projects.id = users_projects.project_id INNER JOIN users on users.id = user_id WHERE project_id = $1;',
  [projectID],
);

module.exports = selectProjectDetails;
