const connection = require('../config/connection');

const getUsers = () => connection.query('select * from users');

module.exports = getUsers;
