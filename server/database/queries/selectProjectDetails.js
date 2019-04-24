const connect = require('./../config/connection');

const selectProjectDetails = projectID => connect.query(`SELECT
                                                          projects.* 
                                                        FROM
                                                          users_projects
                                                        INNER JOIN
                                                          projects
                                                        ON 
                                                          projects.id = users_projects.project_id
                                                        WHERE
                                                          project_id = $1;`, [projectID]);

module.exports = selectProjectDetails;
