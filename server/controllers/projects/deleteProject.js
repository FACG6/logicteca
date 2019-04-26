const deleteProjectQuery = require('../../database/queries/deleteProject');

exports.deleteProject = (req, res, next) => {
  const { projectId } = req.params;
  deleteProjectQuery(projectId)
    .then((result) => {
      let data = null;
      if (result.rowCount) {
        data = true;
      } else {
        data = false;
      }
      const projectsData = {
        data,
        error: null,
      };
      res.send(projectsData);
    })
    .catch(e => next(e));
};
