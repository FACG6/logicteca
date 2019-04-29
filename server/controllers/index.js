const router = require('express').Router();

const projects = require('./projects');
const users = require('./users');
const scrums = require('./scrums');
const tasks = require('./tasks');
const logout = require('./logout');
const { auth } = require('./middleware/authentication');
const error = require('./error');


router.get('/logout', logout);
// router.use(auth);
router.use('/projects', projects);
router.use('/users', users);
router.use('/scrums', scrums);
router.use('/tasks', tasks);
router.use(error.server);

module.exports = router;
