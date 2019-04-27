const deleteProjectQuery = require('../../database/queries/deleteProject');

exports.deleteProject = (req, res, next) => {
  const { projectId } = req.params;
  deleteProjectQuery(projectId)
    .then((result) => {
      const projectsData = {
        data: !!result.rowCount,
        error: null,
      };
      res.send(projectsData);
    })
    .catch(e => next(e));
};
