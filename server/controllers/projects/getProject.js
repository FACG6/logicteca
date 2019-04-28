const selectProjectDetails = require('../../database/queries/selectProjectDetails');
const refactorData = require('./helper');

exports.getProject = (req, res, next) => {
  const { projectId } = req.params;
  selectProjectDetails(projectId)
    .then((result) => {
      const projectsData = {
        data: refactorData(result.rows),
        error: null,
      };
      res.send(projectsData);
    })
    .catch(e => next(e));
};
