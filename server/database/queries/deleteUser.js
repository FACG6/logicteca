const connection = require('../config/connection');

module.exports = userId => connection.query(`DELETE FROM
                                              users 
                                            WHERE 
                                              id = $1 
                                            RETURNING id`, [userId]);
