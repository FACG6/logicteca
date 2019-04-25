const deleteUser = require('../../database/queries/deleteUser');

exports.deleteUser = (req, res) => {
  const { userId } = req.params;
  deleteUser(userId)
    .then((results) => {
      if (results.rowCount) {
        res.send({ error: null, data: results.rows[0].id });
      } else {
        res.status(401).send({ error: { status: 401, msg: 'No user available with this id' } });
      }
    })
    .catch(() => res.send({ error: { code: 500, msg: 'Internal Server Error' }, data: null }));
};
