const router = require('express').Router();
const validation = require('./validation');

const { deleteTask } = require('./deleteTask');
const { put } = require('./put');
const { post } = require('./post');

router.route('/new').post(post);

router
  .route('/:taskId')
  .put(validation, put)
  .delete(deleteTask);

module.exports = router;
