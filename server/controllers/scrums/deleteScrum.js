const joi = require('joi');

const deleteScrum = require('./../../database/queries/deleteScum');

exports.deleteScrum = (request, response, next) => {
  const schema = joi.object().keys({
    id: joi.number().integer(),
  });
  const { id } = request.body;
  const result = joi.validate({ id }, schema);

  if (!result.error) {
    deleteScrum(id)
      .then((res) => {
        response.send({ error: null, data: res.rows[0] });
      })
      .catch(error => next(error));
  } else {
    next({ code: 422 });
  }
};
