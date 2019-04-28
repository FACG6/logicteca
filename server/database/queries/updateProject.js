const connection = require('../config/connection');

const updateProject = (name, description, projectId) => connection.query(`UPDATE
                                                                            projects
                                                                         SET
                                                                            name=$1, description=$2
                                                                         WHERE
                                                                            id=$3
                                                                         RETURNING
                                                                            *;`, [name, description, projectId]);

const deleteProjectUsers = projectId => connection.query(`DELETE FROM
                                                            users_projects
                                                          WHERE
                                                            project_id=$1`, [projectId]);

module.exports = { updateProject, deleteProjectUsers };
