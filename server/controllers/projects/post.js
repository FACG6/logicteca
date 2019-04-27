const joi = require('joi');

const { insertProject, insertProjectUsers } = require('./../../database/queries/insertProject');

exports.post = (request, response, next) => {
  const schema = joi.object().keys({
    name: joi.string(),
    dsescription: joi.string(),
  });
  const { name, dsescription, row } = request.body;
  const result = joi.validate({ name, dsescription }, schema);

  if (result.error === null) {
    insertProject(name, dsescription)
      .then((res) => {
        const newProjectID = res.rows[0].id;
        return insertProjectUsers(newProjectID, row);
      })
      .then((res) => {
        response.send({ error: null, data: res.rows[0] });
      })
      .catch(error => next(error));
  } else {
    next({ code: 400 });
  }
};
