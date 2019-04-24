const router = require('express').Router();
const {
  getProject, getProjects, putProject, deleteProject, postProject,
} = require('./projects');

router.route('/').get(getProjects);

router
  .route('/:projectId')
  .get(getProject)
  .put(putProject)
  .delete(deleteProject);

router.route('/new').post(postProject);

module.exports = router;
