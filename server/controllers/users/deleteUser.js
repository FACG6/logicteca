const deleteUser = require('../../database/queries/deleteUser');

exports.deleteUser = (req, res, next) => {
  const { userId } = req.params;
  deleteUser(userId)
    .then((results) => {
      if (results.rowCount) {
        res.send({ error: null, data: results.rows[0].id });
      } else next({ code: 401 });
    })
    .catch(error => next(error));
};
