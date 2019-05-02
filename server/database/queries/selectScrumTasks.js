const connect = require('./../config/connection');

const selectScrumTasks = scrumId => connect.query(`SELECT
                                                    tasks.*, scrums.name
                                                  FROM 
                                                    tasks
                                                  INNER JOIN
                                                    scrums 
                                                  ON 
                                                    scrums.id = tasks.scrum_id
                                                  WHERE
                                                   tasks.scrum_id=$1;`, [scrumId]);

module.exports = selectScrumTasks;
