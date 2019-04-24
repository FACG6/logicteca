const connect = require('./../config/connection');

const selectAllProject = () => connect.query(`SELECT 
                                                    * 
                                              FROM 
                                                       projects`);

module.exports = selectAllProject;
