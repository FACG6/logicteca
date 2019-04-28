const connection = require('../config/connection');

const deleteProject = projectId => connection.query('delete from projects where id=$1', [projectId]);

module.exports = deleteProject;
