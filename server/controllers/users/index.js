const router = require('express').Router();

const { deleteUser } = require('./deleteUser');
const { get } = require('./get');
const { post } = require('./post');
const { put } = require('./put');
const validateUser = require('./helpers/validateUser');
const { postPassword } = require('./updatePassword');

router.route('/').get(get);

router.route('/new').post(validateUser, post);

router
  .route('/:userId')
  .put(validateUser, put)
  .delete(deleteUser);

router.put('/:userId/new-password', postPassword);


module.exports = router;
