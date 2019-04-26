const connect = require('../../database/config/connection');

module.exports = name => connect.query('select id from users where user_name = $1', [name]);
