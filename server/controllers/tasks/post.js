const insertTask = require('../../database/queries/insertTask');

exports.post = (req, res, next) => {
  const task = req.body;
  insertTask(task)
    .then((result) => {
      res.send({
        data: result.rows,
        error: null,
      });
    })
    .catch(error => next(error));
};
