const insertUser = require('../../database/queries/insertUser');
const hashedPassword = require('./helpers/hashPassword');
const checkUser = require('../../database/queries/checkUser');

exports.post = (req, res, next) => {
  hashedPassword(req.body.password)
    .then((password) => {
      req.body.password = password;
      return req.body;
    })
    .then(user => checkUser(user.user_name))
    .then((results) => {
      if (results.rowCount) {
        return res.send({ error: { code: 401, msg: 'UserName is already taken' } });
      } return true;
    })
    .then(() => insertUser(req.body))
    .then((response) => {
      if (response.rowCount) return res.send({ error: null, data: response.rows[0] });
      return next({ code: 401 });
    })
    .catch(error => next(error));
};
