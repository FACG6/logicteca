const test = require('tape');
const { selectProjectScrums } = require('../../server/database/queries/selectProjectScrums');

test('Testing query for select project scrums of valid project id', (t) => {
  selectProjectScrums('7d2b3be6-e58a-4591-94fc-f76e17d87aea')
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
