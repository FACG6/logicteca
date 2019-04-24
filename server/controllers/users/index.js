const router = require('express').Router();

const { deleteUser } = require('./deleteUser');
const { get } = require('./get');
const { post } = require('./post');
const { put } = require('./put');

router.route('/').get(get);

router
  .route('/:userId')
  .put(put)
  .delete(deleteUser);

router.route('/new').post(post);

module.exports = router;
