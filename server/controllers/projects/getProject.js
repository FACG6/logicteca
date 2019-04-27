const selectProjectDetails = require('../../database/queries/selectProjectDetails');

const refactorData = (data) => {
  const userId = [];
  data.forEach(element => userId.push(element.user_id));
  const newData = data[0];
  newData.user_id = userId;
  return newData;
};

exports.getProject = (req, res, next) => {
  const { projectId } = req.params;
  selectProjectDetails(projectId)
    .then((result) => {
      const projectsData = {
        data: refactorData(result.rows),
        error: null,
      };
      res.send(projectsData);
    })
    .catch(e => next(e));
};
