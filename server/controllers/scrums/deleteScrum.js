const deleteScrum = require('./../../database/queries/deleteScum');

exports.deleteScrum = (request, response, next) => {
  const { scrumId } = request.params;
  deleteScrum(scrumId)
    .then((res) => {
      response.send({ error: null, data: res.rows[0] });
    })
    .catch(error => next(error));
};
