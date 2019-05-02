const updateTask = require('../../database/queries/updateTask');

exports.put = (req, res, next) => {
  updateTask(req.body)
    .then(() => {
      res.send({ error: null, data: req.body });
    })
    .catch(error => next(error));
};
