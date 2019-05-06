const connection = require('../config/connection');

const selectUsers = () => connection.query('select id, user_name, full_name, role from users');

module.exports = selectUsers;
