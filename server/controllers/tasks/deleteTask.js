const deleteTask = require('./../../database/queries/deleteTask');

exports.deleteTask = (request, response, next) => {
  const { scrumId } = request.params;
  deleteTask(scrumId)
    .then((res) => {
      response.send({ error: null, data: res.rows[0] });
    })
    .catch(error => next(error));
};
