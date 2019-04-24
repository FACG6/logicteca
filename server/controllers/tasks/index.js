const router = require('express').Router();
const { putTask, deleteTask, postTask } = require('./tasks');

router
  .route('/:taskId')
  .put(putTask)
  .delete(deleteTask);

router.route('/new').post(postTask);

module.exports = router;
