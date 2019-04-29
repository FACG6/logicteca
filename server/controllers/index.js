const router = require('express').Router();
const projects = require('./projects');
const users = require('./users');
const scrums = require('./scrums');
const tasks = require('./tasks');
const login = require('./login');


router.use('/login', login)
const logout = require('./logout');
const { auth } = require('./middleware/authentication');

router.get('/logout', logout);
// router.use(auth);
router.use('/projects', projects);
router.use('/users', users);
router.use('/scrums', scrums);
router.use('/tasks', tasks);

module.exports = router;
