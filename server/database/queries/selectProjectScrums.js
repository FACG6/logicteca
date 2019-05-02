const connect = require('./../config/connection');

const selectProjectScrums = (id) => {
  const getScrums = {
    text: 'SELECT *  FROM scrums where project_id=$1 ',
    values: [id],
  };
  return connect.query(getScrums);
};

module.exports = selectProjectScrums;
