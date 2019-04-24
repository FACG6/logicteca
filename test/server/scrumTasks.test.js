const test = require('tape');
const selectScrumTasks = require('../../server/database/queries/selectScrumTasks');

test('test query for scrum tasks', (t) => {
  selectScrumTasks('58a151cc-b822-40eb-b59e-b3edad510cb3')
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
      if (res) {
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
      }
    })
    .catch((error) => {
      t.error(error);
    });
});

test.onFinish(() => {
  process.exit(0);
});
