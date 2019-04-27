const router = require('express').Router();

const { deleteUser } = require('./deleteUser');
const { get } = require('./get');
const { post } = require('./post');
const { put } = require('./put');
const validateUser = require('./helpers/validateUser');

router.route('/').get(get);

router.route('/new').post(post);

router
  .route('/:userId')
  .put(validateUser, put)
  .delete(deleteUser);


module.exports = router;
