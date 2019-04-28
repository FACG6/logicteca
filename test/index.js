/* eslint-disable global-require */
const build = require('./../server/database/config/dbBuild');
const fakeData = require('./../server/database/config/insertFakeData');

build()
  .then(() => fakeData())
  .then(() => require('./server/selectUsers'))
  .then(() => require('./server/routes/getUsers'))
  .then(() => require('./server/routes/getProjectsRoute'))
  .then(() => require('./server/routes/getProjectRoute'))
  .then(() => require('./server/projectDetailsQuery.test'))
  .then(() => require('./server/insertUser'))
  .then(() => require('./server/projectNewQuery.test'))
  .then(() => require('./server/routes/projectNewRoute.test'))
  .then(() => require('./server/getScrumRoute'))
  .then(() => require('./server/scrumTasks.test'))
  // .then(() => require('./server/insertNewTask'))
  .then(() => require('./server/routes/postUser'))
  .then(() => require('./server/updateUser'))
  .then(() => require('./server/routes/updateUser'))
  .then(() => require('./server/routes/postScrumRoute'))
  .then(() => require('./server/insertScrumQuery'))
  .then(() => require('./server/routes/insertTaskRoute'))
  .then(() => require('./server/routes/projectEditRoute.test'))
  .then(() => require('./server/deleteUser'))
  .then(() => require('./server/routes/deleteScrumRoute'))
  .then(() => require('./server/routes/deleteUser.route'))
  .then(() => require('./server/routes/deleteProjectRoute'))

  .catch(err => console.log(err));
