const router = require('express').Router();

const { getScrums } = require('./getScrums');
const { deleteScrum } = require('./deleteScrum');
const { getTasks } = require('./getTasks');
const { put } = require('./put');
const { post } = require('./post');
const validateNewScrum = require('./helpers/validateNewScrum');

router.route('/').get(getScrums);

router
  .route('/:scrumId')
  .get(getTasks)
  .put(put)
  .delete(deleteScrum);

router.route('/new').post(validateNewScrum, post);

module.exports = router;
