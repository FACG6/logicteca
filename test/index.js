/* eslint-disable global-require */
const build = require('./../server/database/config/dbBuild');
const fakeData = require('./../server/database/config/insertFakeData');

build()
  .then(fakeData)
  .then(() => require('./server/selectUsers'))
  .then(() => require('./server/routes/getUsers'))
  .then(() => require('./server/routes/getProjectsRoute'))
  .then(() => require('./server/routes/getProjectRoute'))
  .then(() => require('./server/projectDetailsQuery.test'))
  .then(() => require('./server/routes/deleteScrumRoute'))
  .then(() => require('./server/projectNewQuery.test'))
<<<<<<< HEAD
  .then(() => require('./server/scrumTasks.test'))
  .then(() => require('./server/routes/projectNewRoute.test'))
  .then(() => require('./server/insertNewTask'))
  .then(() => require('./server/routes/projectEditRoute.test')) // last test in select and insert
=======
  // .then(() => require('./server/scrumTasks.test'))
  // .then(() => require('./server/insertNewTask'))
>>>>>>> bb90713e2fa9e30493bfd3fc474335da92ac1027
  .catch(err => console.log(err));
