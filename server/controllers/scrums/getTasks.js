const selectScrumTasks = require('../../database/queries/selectScrumTasks');

exports.getTasks = (req, res) => {
  console.log(222, req.params.scrumId);
  // console.log(33333333);
  selectScrumTasks(req.params.scrumId)
    .then(result => console.log(result.rwos[0]))
    .catch(err => console.log(err));
  res.send('single Tasks get');
};
