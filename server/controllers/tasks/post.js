const insertTask = require('../../database/queries/insertTask');

exports.post = (req, res, next) => {
  const { addedTask } = req.body;
  insertTask(addedTask)
    .then((result) => {
      res.send({
        data: result.rows,
        error: null,
      });
    })
    .catch(err => next(err));
};
