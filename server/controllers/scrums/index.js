const router = require('express').Router();

const { deleteScrum } = require('./deleteScrum');
const { getTasks } = require('./getTasks');
const { put } = require('./put');
const { post } = require('./post');
const validateNewScrum = require('./helpers/validateNewScrum');

router.route('/new').post(validateNewScrum, post);

router
  .route('/:scrumId')
  .get(getTasks)
  .put(put)
  .delete(deleteScrum);

module.exports = router;
