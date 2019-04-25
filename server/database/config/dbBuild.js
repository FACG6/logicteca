const { readFileSync } = require('fs');
const path = require('path');
const connect = require('./connection');

const sql = readFileSync(path.join(__dirname, 'dbBuild.sql')).toString();

const buildDB = () => connect.query(sql);

module.exports = buildDB;
