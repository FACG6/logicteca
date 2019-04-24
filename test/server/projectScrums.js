const test = require('tape');
const { selectProjectScrums } = require('../../server/database/queries/selectProjectScrums');

test('Testing query for select project scrums of valid data', (t) => {
  const scrum = {
    project_id: '7d2b3be6-e58a-4591-94fc-f76e17d87aea',
    name: 'Scrum1',
    description: 'Custom built task management system',
    scrum_id: '1d675bb9-eaf2-4a11-8f29-c17e71af337e',
  };
  selectProjectScrums('7d2b3be6-e58a-4591-94fc-f76e17d87aea')
    .then((res) => {
      t.deepEqual(res.rows[0], scrum, 'Must return row of scrum of project');
      t.end();
    })
    .catch((err) => {
      t.error(err);
      t.end();
    });
});

test('Testing query for select project scrums of in-valid id', (t) => {
  selectProjectScrums('7d2b3be6-e58a-4591-94fc-f76e98d87aea')
    .then((res) => {
      t.deepEqual(res.rows[0], undefined, 'Must return row of scrum of project');
      t.end();
    })
    .catch((err) => {
      t.error(err);
      t.end();
    });
});
