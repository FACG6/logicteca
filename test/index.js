<<<<<<< HEAD
/* eslint-disable global-require */
=======
>>>>>>> d7689512756f44357b7a3f41eb72d58a63cd7a46
const build = require('./../server/database/config/dbBuild');
const fakeData = require('./../server/database/config/insertFakeData');

build()
  .then(() => fakeData())
<<<<<<< HEAD
  .then(() => require('./server/projectDetailsQuery.test'))
  .then(() => require('./server/projectNewQuery.test'))
  .then(() => require('./server/scrumTasks.test'))
  .then(() => require('./server/router/projectNewRoute.test'))
=======
  .then(() => require('./server/selectUsers'))
  .then(() => require('./server/routes/getUsers'))
>>>>>>> d7689512756f44357b7a3f41eb72d58a63cd7a46
  .catch(err => console.log(err));
