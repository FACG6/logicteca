const selectProjectDetails = require('../../database/queries/selectProjectDetails');
const refactorData = require('./helper');

exports.getProject = (req, res, next) => {
  const { projectId } = req.params;
  selectProjectDetails(projectId)
    .then((result) => {
      const {
        id, name, description, userNames,
      } = refactorData(result.rows);
      const projectsData = {
        data: {
          id,
          name,
          description,
          userNames,
        },
        error: null,
      };
      res.send(projectsData);
    })
    .catch(error => next(error));
};
