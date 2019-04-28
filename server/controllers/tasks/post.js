const insertTask = require('../../database/queries/insertTask');

exports.post = (req, res, next) => {
  insertTask(req.body)
    .then((result) => {
      res.send({
        data: result.rows,
        error: null,
      });
    })
    .catch(err => next(err));
};
