const test = require('tape');
const connect = require('../../server/database/config/connection');
const selectAllProject = require('./../../server/database/queries/selectProjects');

test('test query for all projests', (t) => {
  selectAllProject()
    .then((res) => {
      if (res.rowCount !== 0) {
        t.equal(res.rowCount !== 0, true, 'there is projects in data base');
        return res.rows;
      }
      t.equal(res.rowCount === 0, true, 'there is no projects in data base');
      t.end();
      return false;
    })
    .then((res) => {
      if (res) {
        const firstProject = res[0];
        t.equal(
          Object.keys(firstProject),
          ['id', 'name', 'description', 'created_at '],
          'there is no projects in data base',
        );
        t.end();
      }
    })
    .chatch((error) => {
      t.error(error);
    });
});

test.onFinish(() => {
  process.exit(0);
});
