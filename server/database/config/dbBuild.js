const { readFileSync } = require('fs');
const path = require('path');
const connect = require('./connection');

let sql = '';
if (process.env.NODE_ENV === 'test') {
  sql = readFileSync(path.join(__dirname, 'dbBuildFakeData.sql')).toString();
} else {
  sql = readFileSync(path.join(__dirname, 'dbBuild.sql')).toString();
}

const buildDB = () => connect.query(sql);


module.exports = buildDB;
