const router = require('express').Router();

const { deleteTask } = require('./deleteTask');
const { put } = require('./put');
const { post } = require('./post');

router.route('/new').post(post);

router
  .route('/:taskId')
  .put(put)
  .delete(deleteTask);

module.exports = router;
