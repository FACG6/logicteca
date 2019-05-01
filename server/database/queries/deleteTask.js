const connect = require('./../config/connection');

const deleteTask = taskId => connect.query(`DELETE FROM
                                                tasks
                                              WHERE
                                                id=$1
                                              RETURNING
                                                *;`, [taskId]);

module.exports = deleteTask;
