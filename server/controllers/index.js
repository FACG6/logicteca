const router = require('express').Router();

const projects = require('./projects');
const users = require('./users');
const scrums = require('./scrums');
const tasks = require('./tasks');
const login = require('./login');
const { isAuthenticated } = require('./isAuth');

router.use('/login', login);
const logout = require('./logout');
const { auth } = require('./middleware/authentication');
const error = require('./middleware/error');

router.get('/logout', logout);
router.use(auth);
router.get('/isAuthenticated', isAuthenticated);
router.use('/projects', projects);
router.use('/users', users);
router.use('/scrums', scrums);
router.use('/tasks', tasks);
router.use(error.server);

module.exports = router;
