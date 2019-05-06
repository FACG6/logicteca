const selectProjectScrum = require('../../database/queries/selectProjectScrums');

exports.getScrums = (req, res, next) => {
  const { projectId } = req.params;
  selectProjectScrum(projectId)
    .then(result => result.rows.map(ele => ({ id: ele.id, scrumName: ele.name })))
    .then((result) => {
      res.send({
        data: result,
        error: null,
      });
    })
    .catch(error => next(error));
};
