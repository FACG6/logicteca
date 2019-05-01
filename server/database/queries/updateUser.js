const connection = require('../config/connection');

module.exports = ({
  user_name: userName,
  full_name: fullName,
  role,
  id,
}) => connection.query('UPDATE users SET user_name = $1,full_name = $2, role = $3 WHERE id = $4 RETURNING *',
  [userName, fullName, role, id]);
