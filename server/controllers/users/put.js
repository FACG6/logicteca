const updateUser = require('../../database/queries/updateUser');

exports.put = (req, res, next) => {
  const { userId } = req.params;
  updateUser(req.body.user, userId)
    .then(() => {
      res.send({ error: null, data: req.body });
    })
    .catch(error => next(error));
};
