const selectProjectDetails = require('../../database/queries/selectProjectDetails');

exports.getProject = (req, res, next) => {
  const { projectId } = req.params;
  selectProjectDetails(projectId)
    .then((result) => {
      console.log(result);

      const projectsData = {
        data: result,
        error: null,
      };
      return res.send(projectsData);
    })
    .catch(e => next(e));
};
