const { readFileSync } = require('fs');
const path = require('path');
const connect = require('./connection');

const sql = readFileSync(path.join(__dirname, 'dbBuild.sql')).toString();

const DBRun = cb => connect.query(sql, (err) => {
  cb(err);
});

DBRun((err) => {
  if (err) console.log('err', err);
  else console.log('DB built');
});

module.exports = DBRun;
