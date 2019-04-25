const router = require('express').Router();

const { deleteTask } = require('./deleteTask');
const { put } = require('./put');
const { post } = require('./post');

router
  .route('/:taskId')
  .put(put)
  .delete(deleteTask);

router.route('/new').post(post);

module.exports = router;
