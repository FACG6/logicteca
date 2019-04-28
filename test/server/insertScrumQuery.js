const test = require('tape');
const insertScrum = require('../../server/database/queries/insertScrum');

const connection = require('../../server/database/config/connection');

connection
  .query('select id from projects limit 1')
  .then((result) => {
    const projectId = result.rows[0].id;
    return insertScrum('demo2', projectId);
  })
  .then((res) => {
    test('check insertScrum Query', (t) => {
      t.deepEqual(
        Object.keys(res.rows[0]),
        ['id', 'name', 'project_id'],
        'new scrum iserted successfully',
      );
      t.end();
    });
  })
  .catch(e => console.log(e));
