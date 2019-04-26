const selectScrumTasks = require('../../database/queries/selectScrumTasks');

exports.getTasks = (req, res) => {
  selectScrumTasks(req.params.scrumId)
    .then(result => res.send(result.rows))
    .catch(err => res.send({ errMsg: err }));
};

// const connect = require('../../database/config/connection');

// const selectScrum = () => {
//   const getScrums = {
//     text: 'SELECT * from scrums inner join tasks on tasks.scrum_id = scrums.id',
//   };
//   return connect.query(getScrums);
// };
// exports.getTasks = (req, res) => {
//   // console.log(222, req.params.scrumId);
//   // console.log(33333333);
//   selectScrum(req.params.scrumId)
//     // .then(result => console.log(888, result.rows))
//     .then(result => res.send(result.rows))
//     // .catch(err => console.log(err));
//     .catch(err => res.send({ errMsg: err }));
// };
