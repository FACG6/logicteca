const connection = require('../config/connection');

const insertUser = (userName, fullName, role, password) => connection.query(
  'INSERT INTO users (user_name, full_name, role, password) values($1,$2, $3, $4) returning *',
  [userName, fullName, role, password],
);

module.exports = insertUser;
