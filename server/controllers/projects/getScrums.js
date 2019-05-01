const selectProjectScrum = require('../../database/queries/selectProjectScrums');

exports.getScrums = (req, res, next) => {
  const { projectId } = req.params;
  selectProjectScrum(projectId)
    .then(result => result.rows)
    .then(result => result.map(ele => ({ id: ele.scrum_id, scrumName: ele.name })))
    .then(result => res.send({
      data: result,
      error: null,
    }))
    .catch(e => next(e));
};
