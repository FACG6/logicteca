/* eslint-disable global-require */
const build = require('./../server/database/config/dbBuild');
const fakeData = require('./../server/database/config/insertFakeData');

build()
  .then(fakeData)
  .then(() => require('./server/projectDetailsQuery.test'))
  .then(() => require('./server/projectNewQuery.test'))
  .then(() => require('./server/scrumTasks.test'))
  .then(() => require('./server/routes/projectNewRoute.test'))
  .then(() => require('./server/insertNewTask'))
  .then(() => require('./server/routes/projectEditRoute.test')) // last test in select and insert
  .catch(err => console.log(err));
