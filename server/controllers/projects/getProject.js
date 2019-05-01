const { selectProjectScrums } = require('../../database/queries/selectProjectScrums');

exports.getProject = (req, res, next) => {
  const { projectId } = req.params;
  selectProjectScrums(projectId)
    .then((result) => {
      res.send({
        data: result.rows,
        error: null,
      });
    })
    .catch(e => next(e));
};
