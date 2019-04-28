const updateUser = require('../../database/queries/updateUser');

exports.put = (req, res, next) => {
  updateUser(req.body)
    .then(() => {
      res.send({ error: null, data: req.body });
    })
    .catch(error => next(error));
};
