const build = require('./../server/database/config/dbBuild');
const fakeData = require('./../server/database/config/insertFakeData');

build()
  .then(() => fakeData())
  .then(() => require('./server/insertUser'))
  .then(() => require('./server/router/postUser'))
  .catch(err => console.log(err));
