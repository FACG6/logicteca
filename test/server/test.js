const test = require('tape');
const buildDB = require('../../server/database/config/dbBuild');
const insertUser = require('../../server/database/queries/insertUser');

// Database Queries Tests
test('test insertUser database Query', (t) => {
  buildDB()
    .then(() => insertUser('Aymanco', 'Ayman AlQoqa', 'developper', '1234567'))
    .then((result) => {
      t.equal(result.rowCount, 1, 'New user is inserted');
      t.equal(Object.keys(result.rows[0]).length, 5, 'All users name Fields inserted Successfully');
      t.equal(result.rows[0].user_name, 'Aymanco', 'Username is inserted successfully');
      t.end();
    })
    .catch(err => t.error(err));
});
