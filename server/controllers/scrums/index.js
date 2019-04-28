const router = require('express').Router();

const { deleteScrum } = require('./deleteScrum');
const { getTasks } = require('./getTasks');
const { put } = require('./put');
const { post } = require('./post');
const validateNewScrum = require('./helpers/validateNewScrum');

router
  .route('/:scrumId')
  .get(getTasks)
  .put(put)
  .delete(deleteScrum);

router.route('/new').post(validateNewScrum, post);

module.exports = router;
