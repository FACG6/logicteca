const connection = require('../config/connection');

const selectUsers = () => connection.query('select id, full_name, role from users');

module.exports = selectUsers;
