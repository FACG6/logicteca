const joi = require('@hapi/joi');

const { updateProject, deleteProjectUsers } = require('./../../database/queries/updateProject');
const { insertProjectUsers } = require('./../../database/queries/insertProject');

exports.put = (request, response, next) => {
  const schema = joi.object().keys({
    name: joi.string(),
    dsescription: joi.string(),
  });
  const { name, dsescription, row } = request.body;
  const result = joi.validate({ name, dsescription }, schema);

  if (!result.error) {
    updateProject(name, dsescription)
      .then((res) => {
        console.log(res)
        const newProjectID = res.rows[0].id;
        deleteProjectUsers(newProjectID);
        return newProjectID;
      })
      .then(newProjectID => insertProjectUsers(newProjectID, row))
      .then((res) => {
        response.send({ error: null, data: res.rows[0] });
      })
      .catch(error => next(error));
  } else {
    next({ code: 400 });
  }
};
