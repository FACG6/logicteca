const test = require('tape');
const selectProjectDetails = require('../../server/database/queries/selectProjectDetails');

test('test query for projest details', (t) => {
  selectProjectDetails('7d2b3be6-e58a-4591-94fc-f76e17d87aea')
    .then((res) => {
      if (res.rowCount !== 0) {
        t.equal(res.rowCount !== 0, true, 'there is project in data base');
        return res.rows;
      }
      t.equal(res.rowCount === 0, true, 'there is no project in data base');
      t.end();
      return false;
    })
    .then((res) => {
      if (res) {
        const firstProject = res[0];
        t.deepEqual(
          Object.keys(firstProject),
          ['user_name', 'full_name', 'role', 'userid', 'id', 'name', 'description', 'created_at'],
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
