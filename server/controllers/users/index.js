const router = require('express').Router();
const {
  getUsers, putUser, deleteUser, postUser,
} = require('./users');

router.route('/').get(getUsers);

router
  .route('/:userId')
  .put(putUser)
  .delete(deleteUser);

router.route('/new').post(postUser);

module.exports = router;
