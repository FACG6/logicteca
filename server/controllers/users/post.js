const insertUser = require('../../database/queries/insertUser');
const hashedPassword = require('./helpers/hashPassword');
const checkUser = require('../../database/queries/checkUser');

exports.post = (req, res, next) => {
  checkUser(req.body.user_name)
    .then((results) => {
      if (results.rowCount) {
        return res.status(422).send({ error: { code: 422, msg: 'UserName is already taken' } });
      }
      hashedPassword(req.body.password)
        .then((password) => {
          req.body.password = password;
          return req.body;
        })
        .then(insertUser)
        .then((response) => {
          if (response.rowCount) return res.send({ error: null, data: response.rows[0] });
          return next({ code: 500, msg: 'Error in inserting user' });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
};
