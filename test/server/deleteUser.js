const test = require('tape');
const deleteUser = require('../../server/database/queries/deleteUser');
const selectId = require('../../server/database/queries/selectId');
const runBuild = require('../../server/database/config/dbBuild');
const insertFakeData = require('../../server/database/config/insertFakeData');

test('test deleteUser Query', (t) => {
  const keys = ['id'];
  runBuild()
    .then(insertFakeData)
    .then(selectId)
    .then(response => deleteUser(response.rows[0].id))
    .then((result) => {
      t.equal(result.rowCount, 1, 'should delete one object');
      t.deepEqual(Object.keys(result.rows[0]), keys, 'should contain id');
      t.end();
    })
    .catch((err) => {
      t.error(err);
      t.end();
    });
});
