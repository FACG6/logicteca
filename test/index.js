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
  .then(() => require('./server/projectNewQuery.test'))
  .then(() => require('./server/scrumTasks.test'))
  .then(() => require('./server/router/projectNewRoute.test'))
  .catch(err => console.log(err));
