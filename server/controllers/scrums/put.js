const joi = require('joi');

const updateScrum = require('./../../database/queries/updateScrum');

exports.put = (request, response, next) => {
  const schema = joi.object().keys({
    name: joi.string(),
  });
  const { name } = request.body;
  const result = joi.validate({ name }, schema);
  const { scrumId } = request.params;

  if (!result.error) {
    updateScrum(name, scrumId)
      .then((res) => {
        response.send({ error: null, data: res.rows[0] });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    next({ code: 422, msg: result.error.details[0].message });
  }
};
