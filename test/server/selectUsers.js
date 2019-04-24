const test = require('tape');
const selectUsers = require('../../server/database/queries/selectUsers');

test('test getUsers database Query', (t) => {
  selectUsers()
    .then((result) => {
      t.equal(typeof result.rows && typeof result.rows[0], 'object', 'return object');
      t.equal(
        Object.keys(result.rows[0]).length,
        4,
        'All users name Fields retreived Successfully',
      );
      t.deepEqual(
        Object.keys(result.rows[0]),
        ['id', 'user_name', 'full_name', 'role'],
        'should return all object keys',
      );
      t.end();
    })
    .catch(err => t.error(err));
});
