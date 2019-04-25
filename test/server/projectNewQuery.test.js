const test = require('tape');
const connect = require('./../../server/database/config/connection');
const {
  insertProject,
  insertProjectUsers,
} = require('../../server/database/queries/insertProject');
// query for dynamic test
const selectOneUser = () => connect.query('select id from users LIMIT 1');

test('test query for projest details', (t) => {
  insertProject('logicteca', 'Custom built task management system')
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
      const firstProject = res[0];
      t.deepEqual(Object.keys(firstProject), ['id'], 'correct data');
      return res[0].id;
    })
    .then((projectID) => {
      selectOneUser()
        .then((dynamicData) => {
          if (dynamicData.rowCount !== 0) {
            const dynamicUserId = dynamicData.rows[0].id;
            return dynamicUserId;
          }
          t.equal(dynamicData.rowCount === 0, true, 'there is no project in data base');
          t.end();
          return false;
        })
        .then((dynamicUserId) => {
          insertProjectUsers(projectID, dynamicUserId).then((res) => {
            const userProjectId = res.rows[0];
            t.deepEqual(
              Object.keys(userProjectId),
              ['id', 'project_id', 'user_id'],
              'correct data',
            );
            t.end();
          });
        });
    })
    .catch((error) => {
      t.error(error);
    });
});

test.onFinish(() => {
  process.exit(0);
});
