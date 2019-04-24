const connect = require('./../config/connection');

const selectScrumTasks = scrumId => connect.query(`SELECT
                                                    tasks.*, users.user_name, users.role
                                                  FROM 
                                                    tasks
                                                  INNER JOIN
                                                    users
                                                  ON
                                                    users.id = tasks.assigned_to
                                                  WHERE
                                                   tasks.scrum_id=$1;`, [scrumId]);

module.exports = selectScrumTasks;
