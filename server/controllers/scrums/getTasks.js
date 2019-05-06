const selectScrumTasks = require('../../database/queries/selectScrumTasks');

exports.getTasks = (req, res, next) => {
  selectScrumTasks(req.params.scrumId)
    .then(result => res.send({ data: result.rows, error: null }))
    .catch(error => next(error));
};
