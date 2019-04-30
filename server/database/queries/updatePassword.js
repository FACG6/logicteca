const connection = require('../../database/config/connection');

module.exports = (newPassword, userId) => connection.query('UPDATE users SET password = $1 WHERE id = $2 RETURNING id', [newPassword, userId]);
