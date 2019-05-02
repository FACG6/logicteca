const deleteTask = require('./../../database/queries/deleteTask');

exports.deleteTask = (request, response, next) => {
  const { taskId } = request.params;
  deleteTask(taskId)
    .then((res) => {
      response.send({ error: null, data: res.rows[0] });
    })
    .catch(error => next(error));
};
