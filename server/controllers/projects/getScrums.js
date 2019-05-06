const selectProjectScrum = require('../../database/queries/selectProjectScrums');
const selectProjectDetails = require('../../database/queries/selectProjectDetails');

exports.getScrums = (req, res, next) => {
  const { projectId } = req.params;
  selectProjectDetails(projectId)
    .then(result => result.rows[0])
    .then((details) => {
      selectProjectScrum(projectId)
        .then((scrums) => {
          res.send({
            data: { scrums: scrums.rows, project: details },
            error: null,
          });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
};
