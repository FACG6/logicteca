const test = require('tape');
const connect = require('./../../server/database/config/connection');
const selectScrumTasks = require('../../server/database/queries/selectScrumTasks');
// query for dynamic test
const selectOneScrum = () => connect.query('select id from scrums LIMIT 1');

test('test query for scrum tasks', (t) => {
  selectOneScrum()
    .then((dynamicData) => {
      if (dynamicData.rowCount !== 0) {
        const dynamicId = dynamicData.rows[0].id;
        selectScrumTasks(dynamicId)
          .then((res) => {
            if (res.rowCount !== 0) {
              t.equal(res.rowCount !== 0, true, 'there is takes for scrum in data base');
              return res.rows;
            }
            t.equal(res.rowCount === 0, true, 'there is no takes for scrum in data base');
            t.end();
            return false;
          })
          .then((res) => {
            const firstProject = res[0];
            t.deepEqual(
              Object.keys(firstProject),
              [
                'id',
                'action_type',
                'status',
                'modules',
                'description',
                'estimated_time',
                'spent_time',
                'priority',
                'initial_test_status',
                'ticket',
                'notes',
                'total_efforts',
                'date_to_commit',
                'review_and_test_note',
                'scrum_id',
                'assigned_to',
                'user_name',
                'role',
              ],
              'correct data',
            );
            t.end();
          })
          .catch((error) => {
            t.error(error);
            t.end();
          });
      } else {
        t.equal(dynamicData.rowCount === 0, true, 'there is no takes for scrum in data base');
        t.end();
      }
    })
    .catch((error) => {
      t.error(error);
      t.end();
    });
});

test.onFinish(() => {
  process.exit(0);
});
