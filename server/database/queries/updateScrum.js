const connection = require('../config/connection');

const updateScrum = (scrumName, scrumId) => connection.query(`UPDATE
                                                               scrums
                                                             SET
                                                               name=$1
                                                             WHERE
                                                               id=$2
                                                            RETURNING
                                                               *;`, [scrumName, scrumId]);

module.exports = updateScrum;
