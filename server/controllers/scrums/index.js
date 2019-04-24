const router = require('express').Router();
const {
  getScrums, getTasks, putScrum, deleteScrum, postScrum,
} = require('./scrums');

router.route('/').get(getScrums);

router
  .route('/:scrumId')
  .get(getTasks)
  .put(putScrum)
  .delete(deleteScrum);

router.route('/new').post(postScrum);

module.exports = router;
