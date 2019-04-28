const connection = require('../config/connection');

module.exports = () => connection.query('SELECT id FROM users limit 1');
