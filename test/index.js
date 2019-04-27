const build = require('./../server/database/config/dbBuild');
const fakeData = require('./../server/database/config/insertFakeData');

build()
  .then(() => fakeData())
  .then(() => require('./server/projectDetailsQuery.test'))
  .then(() => require('./server/projectNewQuery.test'))
  .then(() => require('./server/scrumTasks.test'))
  .then(() => require('./server/router/projectNewRoute.test'))
  .then(() => require('./server/insertUser'))
  .then(() => require('./server/router/postUser'))
  .then(() => require('./server/insertNewTask'))
  .catch(err => console.log(err));
