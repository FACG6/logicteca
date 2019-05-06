const insertScrum = require('../../database/queries/insertScrum');

exports.post = (req, res, next) => {
  const { projectId, scrumName } = req.body;
  insertScrum(scrumName, projectId)
    .then((result) => {
      res.send({
        data: result.rows[0],
        error: null,
      });
    })
    .catch(error => next(error));
};
