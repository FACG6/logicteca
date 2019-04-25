const joi = require('@hapi/joi');

const { insertProject, insertProjectUsers } = require('./../../database/queries/insertProject');

exports.post = (request, response) => {
  const schema = joi.object().keys({
    name: joi.string(),
    dsescription: joi.string(),
    row: joi.array().items(joi.string()),
  });
  const { name, dsescription, row } = request.body;
  const result = joi.validate({ name, dsescription, row }, schema);

  if (result.error === null) {
    insertProject(name, dsescription)
      .then((res) => {
        const newProjectID = res.rows[0].id;
        return insertProjectUsers(newProjectID, row);
      })
      .then(() => {
        response.send({ error: null, data: [{ msg: 'add new project successfully' }] });
      })
      .catch(error => response.send({ error, data: null }));
  } else {
    response.status(400).send({ error: result.error, data: null });
  }
};
