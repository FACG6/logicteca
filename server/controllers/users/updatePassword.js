const Joi = require('@hapi/joi');

const hashPassword = require('./helpers/hashPassword');
const updatePasswordQuery = require('../../database/queries/updatePassword');

const schema = Joi.object().keys({
  password: Joi.string().min(6),
});

exports.postPassword = (req, res, next) => {
  const { userId } = req.params;
  Joi.validate(req.body, schema)
    .then((password) => {
      hashPassword(password.password)
        .then(hashedPassword => updatePasswordQuery(hashedPassword, userId))
        .then((response) => {
          if (response.rowCount) res.send({ error: null, data: 'success' });
          else next({ code: 400 });
        })
        .catch(error => next(error));
    })
    .catch(() => next({ code: 422 }));
};
