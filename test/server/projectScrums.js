const test = require('tape');
const connect = require('../../server/database/config/connection');
const { selectProjectScrums } = require('../../server/database/queries/selectProjectScrums');

const getProjectScrums = () => {
  const getScrums = {
    text: 'SELECT projects.id as project_id, projects.name, scrums.id as scrum_id, scrums.name  FROM scrums inner join projects ON projects.id = scrums.project_id limit 1',
  };
  return connect.query(getScrums);
};

test('Testing query for select project scrums of valid project id', (t) => {
  getProjectScrums()
    .then(result => selectProjectScrums(result.rows[0].project_id))
    .then((res) => {
      t.deepEqual(Object.keys(res.rows[0]), ['project_id', 'name', 'scrum_id'], 'Should return all obj keys for scrum of project');
      t.end();
    })
    .catch((err) => {
      t.error(err);
      t.end();
    });
});

test('Testing query for select project scrums of in-valid project id', (t) => {
  selectProjectScrums('7d2b3be6-e58a-4591-94fc-f76e98d87aea')
    .then((res) => {
      t.deepEqual(res.rows[0], undefined, 'Should return empty row ');
      t.end();
    })
    .catch((err) => {
      t.error(err);
      t.end();
    });
});
