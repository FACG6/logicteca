const test = require('tape');
const selectProjectDetails = require('../../server/database/queries/selectProjectDetails');
const runBuild = require('../../server/database/config/dbBuild');
const insertFakeData = require('../../server/database/config/insertFakeData');

test('test query for projest details', (t) => {
  runBuild()
    .then(insertFakeData())
    .then(selectProjectDetails('7d2b3be6-e58a-4591-94fc-f76e17d87aea')
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
            ['id', 'name', 'description', 'created_at'],
            'correct data',
          );
          t.end();
        }
      })
    )

    .catch((error) => {
      t.error(error);
    });
});

test.onFinish(() => {
  process.exit(0);
});
