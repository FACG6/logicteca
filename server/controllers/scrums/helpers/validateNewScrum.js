const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  name: Joi.string().required(),
});

module.exports = (req, res, next) => {
  const { scrumName } = req.body;
  Joi.validate({ name: scrumName }, schema)
    .then(() => next())
    .catch(() => next({ code: 422 }));
};
