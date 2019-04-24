const connect = require('./../config/connection');

const selectProjectScrums = (id) => {
  const getScrums = {
    text: 'SELECT projects.id as project_id, projects.name, scrums.id as scrum_id, scrums.name  FROM scrums inner join projects ON projects.id = scrums.project_id where projects.id = $1',
    values: [id],
  };
  return connect.query(getScrums);
};

module.exports = { selectProjectScrums };
