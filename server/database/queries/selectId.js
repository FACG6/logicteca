const connection = require('../config/connection');

module.exports = userName => connection.query('SELECT id FROM users WHERE user_name = $1', [userName]);
