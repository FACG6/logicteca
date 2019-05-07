const updateTask = require('../../database/queries/updateTask');

exports.put = (req, res, next) => {
  const { taskId } = req.params;
  updateTask(req.body, taskId)
    .then((result) => {
      res.send({ error: null, data: result.rows[0] });
    })
    .catch(error => next(error));
};
