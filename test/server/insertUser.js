const test = require('tape');
const insertUser = require('../../server/database/queries/insertUser');

test('test query for insertUser', (t) => {
  const newUser = {
    user_name: 'angham',
    full_name: 'angham abu abed',
    role: 'developer',
    password: '12345angham',
  };
  const keys = ['id', 'user_name', 'full_name', 'role'];
  insertUser(newUser)
    .then((res) => {
      t.equal(res.rowCount, 1, 'should be 1');
      t.deepEqual(
        Object.keys(res.rows[0]),
        keys, 'should contain id, user_name, full_name, role',
      );
      t.end();
    })
    .catch((error) => {
      t.error(error);
      t.end();
    });
});

test.onFinish(() => {
  process.exit(0);
});
