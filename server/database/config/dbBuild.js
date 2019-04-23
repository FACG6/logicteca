const { readFileSync } = require('fs');
const path = require('path');
const connect = require('./connection');

const sql = readFileSync(path.join(__dirname, 'dbBuild.sql')).toString();

const buildDB = file => connect.query(file);

buildDB(sql)
  .then(() => true)
  .catch(err => console.log(err));

module.exports = buildDB;
