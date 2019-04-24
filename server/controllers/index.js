const router = require('express').Router();
const projects = require('./projects/index');
const users = require('./users/index');
const scrums = require('./scrums/index');
const tasks = require('./tasks/index');

router.use('/projects', projects);
router.use('/users', users);
router.use('/scrums', scrums);
router.use('/tasks', tasks);
module.exports = router;
