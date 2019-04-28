const connection = require('../config/connection');

module.exports = userName => connection.query('select * from users where user_name = $1', [userName]);
