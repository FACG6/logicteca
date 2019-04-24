const connect = require('./../config/connection');

const selectProjectDetails = projectID => connect.query(`SELECT
                                                          users.user_name, users.full_name, users.role, users.id
                                                        AS
                                                          userId, projects.* from users_projects
                                                        INNER JOIN
                                                          users 
                                                        ON 
                                                          users.id = users_projects.user_id
                                                        INNER JOIN
                                                          projects
                                                        ON 
                                                          projects.id = users_projects.project_id
                                                        WHERE
                                                          project_id = $1;`, [projectID]);

module.exports = selectProjectDetails;
