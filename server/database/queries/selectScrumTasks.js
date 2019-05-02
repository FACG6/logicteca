const connect = require('./../config/connection');

const selectScrumTasks = scrumId => connect.query(`SELECT
                                                    tasks.*, users.user_name, users.role, name
                                                  FROM 
                                                    tasks
                                                  INNER JOIN
                                                    users
                                                  ON
                                                    users.user_name = tasks.assigned_to
                                                  INNER JOIN
                                                    scrums 
                                                  ON 
                                                    scrums.id = scrum_id
                                                  WHERE
                                                   tasks.scrum_id=$1;`, [scrumId]);

module.exports = selectScrumTasks;
