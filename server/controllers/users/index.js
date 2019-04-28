const router = require('express').Router();

const { deleteUser } = require('./deleteUser');
const { get } = require('./get');
const { post } = require('./post');
const { put } = require('./put');
const validateUser = require('./helpers/validateUser');

router.route('/').get(get);

router
  .route('/:userId')
  .put(put)
  .delete(deleteUser);

router.route('/new').post(validateUser, post);

module.exports = router;
