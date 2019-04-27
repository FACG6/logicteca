const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  user_name: Joi.string()
    .alphanum()
    .min(3)
    .required(),
  full_name: Joi.string().min(6),
  role: Joi.string(),
  password: Joi.string().min(6),
});

module.exports = (req, res, next) => {
  const user = req.body;
  Joi.validate(user, schema)
    .then(() => next())
    .catch(() => next({ code: 422 }));
};
