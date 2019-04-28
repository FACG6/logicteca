const connection = require('../config/connection');

const insertScrum = (scrumName, projectId) => connection.query('INSERT INTO scrums (name, project_id) values($1,$2) returning *', [
  scrumName,
  projectId,
]);

module.exports = insertScrum;
