const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  id: Joi.number().integer(),
  name: Joi.string()
    .alphanum()
    .min(3)
    .required(),
});

module.exports = (req, res, next) => {
  const { projectId, scrumName } = req.body;
  Joi.validate({ id: projectId, name: scrumName }, schema)
    .then(() => next())
    .catch(() => next({ code: 422 }));
};
