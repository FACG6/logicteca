const Joi = require('@hapi/joi');

const option = Joi.alternatives().try([
  Joi.number()
    .empty('')
    .allow(null),
  Joi.string().regex(/\d{1,2}[\,\.]{1}/),
]);
const schema = Joi.object().keys({
  estimated_time: option,
  spent_time: option,
  priority: option,
  total_efforts: option,
});

module.exports = (req, res, next) => {
  const {
    estimated_time, spent_time, priority, total_efforts,
  } = req.body;
  Joi.validate(
    {
      estimated_time,
      spent_time,
      priority,
      total_efforts,
    },
    schema,
  )
    .then(() => next())
    .catch((error) => {
      error.code = 422;
      next(error);
    });
};
