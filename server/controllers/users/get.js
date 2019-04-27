const selectUsers = require('../../database/queries/selectUsers');

exports.get = (req, res, next) => {
  selectUsers()
    .then(response => response.rows)
    .then((users) => {
      res.send({ error: null, data: users });
    }).catch(error => next(error));
};
