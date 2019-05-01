const updateUser = require('../../database/queries/updateUser');

exports.put = (req, res, next) => {
  updateUser(req.body)
    .then((result) => {
      res.send({ error: null, data: result.rows[0] });
    })
    .catch(error => next(error));
};
