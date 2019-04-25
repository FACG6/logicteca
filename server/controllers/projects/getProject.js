const selectProjectDetails = require('../../database/queries/selectProjectDetails');

exports.getProject = (req, res, next) => {
  const { projectId } = req.params;
  selectProjectDetails(projectId)
    .then((result) => {
      const projectsData = {
        data: result.rows,
        error: null,
      };
      return res.send(projectsData);
    })
    .catch(e => next(e));
};
