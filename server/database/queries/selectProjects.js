const connect = require('./../config/connection');

const selectAllProject = () => connect.query('SELECT * FROM projects ORDER BY id DESC');

module.exports = selectAllProject;
