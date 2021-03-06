const test = require('tape');

const selectId = require('../../server/database/queries/selectId');
const updateUser = require('../../server/database/queries/updateUser');

test('test getUsers database Query', (t) => {
  const newUserInfo = { user_name: 'Israa', role: 'Scrum Master', full_name: 'Israa Sulaiman' };
  selectId()
    .then(response => response.rows[0].id)
    .then(id => updateUser(newUserInfo, id))
    .then((user) => {
      t.equal(
        Object.keys(user.rows[0]).length,
        4,
        'number of keys is 5',
      );
      t.deepEqual(
        Object.keys(user.rows[0]),
        ['id', 'user_name', 'full_name', 'role'],
        'keys should be: id, user_name, full_name, role, password',
      );
      t.end();
    })
    .catch(err => t.error(err));
});
