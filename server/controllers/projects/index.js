const router = require('express').Router();

const { getProjects } = require('./getProjects');
const { getProject } = require('./getProject');
const { deleteProject } = require('./deleteProject');
const { post } = require('./post');
const { put } = require('./put');

router.route('/').get(getProjects);

router
  .route('/:projectId')
  .get(getProject)
  .put(put)
  .delete(deleteProject);

router.route('/new', post);

module.exports = router;
