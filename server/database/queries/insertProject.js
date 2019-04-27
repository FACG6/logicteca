const connect = require('./../config/connection');

const insertProject = (name, description) => connect.query(`INSERT INTO
                                                              projects (name,description)
                                                            VALUES 
                                                              ($1,$2)
                                                            RETURNING
                                                              id;`, [name, description]);

const insertProjectUsers = (projectID, arrayUserID) => connect.query(`INSERT INTO 
                                                                      users_projects (project_id,user_id) 
                                                                    SELECT 
                                                                      $1
                                                                    AS
                                                                      projectid,
                                                                    UNNEST 
                                                                      ($2::numeric[])
                                                                    AS
                                                                      userid 
                                                                    RETURNING
                                                                      *;`, [projectID, arrayUserID]);

module.exports = { insertProject, insertProjectUsers };
