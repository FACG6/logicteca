const selectProjectScrum = require('../../database/queries/selectProjectScrums');
const selectProjectDetails = require('../../database/queries/selectProjectDetails');
const refactorData = require('./helper');

exports.getScrums = (req, res, next) => {
  const { projectId } = req.params;
  selectProjectDetails(projectId)
    .then(result => result.rows)
    .then((details) => {
      const project = refactorData(details);
      selectProjectScrum(projectId)
        .then((scrums) => {
          res.send({
            data: { scrums: scrums.rows, project },
            error: null,
          });
        })
        .catch(error => next(error));
    })
    .catch(error => next(error));
};
