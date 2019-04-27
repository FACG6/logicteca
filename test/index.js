const build = require('./../server/database/config/dbBuild');
const fakeData = require('./../server/database/config/insertFakeData');

build()
  .then(() => fakeData())
  .then(() => require('./server/selectUsers'))
  .then(() => require('./server/routes/getUsers'))
  .then(() => require('./server/routes/getProjectsRoute'))
  .then(() => require('./server/insertNewTask'))
  .catch(err => console.log(err));
