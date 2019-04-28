const connection = require('../config/connection');

const insertUser = ({
  user_name: userName,
  full_name: fullName,
  role,
  password,
}) => connection.query(
  'INSERT INTO users (user_name, full_name, role, password) values($1, $2, $3, $4) returning id, user_name, full_name, role',
  [userName, fullName, role, password],
);

module.exports = insertUser;
