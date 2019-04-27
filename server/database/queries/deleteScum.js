const connect = require('./../config/connection');

const deleteScrum = scrumId => connect.query(`DELETE FROM
                                                scrums
                                              WHERE
                                                id=$1
                                              RETURNING
                                                *;`, [scrumId]);

module.exports = deleteScrum;
