const updateUser = require('../../database/queries/updateUser');

exports.put = (req, res, next) => {
  updateUser(req.body)
    .then((response) => {
      res.send({ error: null, data: response.rows[0] });
    })
    .catch(error => next(error));
};
