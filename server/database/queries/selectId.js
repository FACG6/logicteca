const connect = require('../../database/config/connection');

module.exports = () => connect.query('select id from users limit 1');
