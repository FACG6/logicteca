const selectAllProject = require('../../database/queries/selectProjects');

exports.getProjects = (req, res, next) => {
  selectAllProject()
    .then(result => result.rows)
    .then((result) => {
      const projectsData = {
        data: result,
        error: null,
      };
      res.send(projectsData);
    })
    .catch(e => next(e));
};
