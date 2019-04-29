const router = require('express').Router();
const projects = require('./projects');
const users = require('./users');
const scrums = require('./scrums');
const tasks = require('./tasks');
const { auth } = require('./middleware/authentication');

router.use(auth);
router.use('/projects', projects);
router.use('/users', users);
router.use('/scrums', scrums);
router.use('/tasks', tasks);

module.exports = router;
