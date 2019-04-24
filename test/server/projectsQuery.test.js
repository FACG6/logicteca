const test = require('tape');
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
        t.deepEqual(
          Object.keys(firstProject),
          ['id', 'name', 'description', 'created_at'],
          'correct data',
        );
        t.end();
      }
    })
    .catch((error) => {
      t.error(error);
    });
});

test.onFinish(() => {
  process.exit(0);
});
