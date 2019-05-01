const updateTask = require('../../database/queries/updateTask');

exports.put = (req, res, next) => {
  console.log(111, req.body);
  updateTask(req.body)
    .then(() => {
      res.send({ error: null, data: req.body });
    })
    .catch(error => next(error));
};
