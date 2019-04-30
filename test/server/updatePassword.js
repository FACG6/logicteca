const test = require('tape');

const updatePassQuery = require('../../server/database/queries/updatePassword');
const selectId = require('../../server/database/queries/selectId');

test('test update password query', (t) => {
  const newPassword = '123456israa';
  selectId()
    .then(result => updatePassQuery(newPassword, result.rows[0].id))
    .then((response) => {
      t.deepEqual(Object.keys(response.rows[0]), ['id'], 'should contain id');
      t.end();
    }).catch((err) => {
      t.error(err);
      t.end();
    });
});
