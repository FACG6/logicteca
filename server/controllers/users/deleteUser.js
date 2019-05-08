const deleteUser = require('../../database/queries/deleteUser');

exports.deleteUser = (req, res, next) => {
  const { userId } = req.params;
  deleteUser(userId)
    .then((results) => {
      if (results.rowCount) {
        res.send({ error: null, data: results.rows[0].id });
      } else next({ msg: 'Error in deleting user' });
    })
    .catch(error => next(error));
};
