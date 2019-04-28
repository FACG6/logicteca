const test = require('tape');
const connect = require('./../../server/database/config/connection');
const selectProjectDetails = require('../../server/database/queries/selectProjectDetails');
// query for dynamic test
const selectOneProject = () => connect.query('select id from projects LIMIT 1');

test('test query for projest details', (t) => {
  selectOneProject()
    .then((dynamicData) => {
      if (dynamicData.rowCount !== 0) {
        const dynamicId = dynamicData.rows[0].id;
        selectProjectDetails(dynamicId)
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
            t.deepEqual(
              Object.keys(firstProject),
              ['id', 'name', 'description', 'created_at', 'user_id'],
              'correct data',
            );
            t.end();
          })
          .catch((error) => {
            t.error(error);
          });
      } else {
        t.equal(dynamicData.rowCount === 0, true, 'there is no project in data base');
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
