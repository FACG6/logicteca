const selectUsers = require('../../database/queries/selectUsers');

exports.get = (req, res) => {
  selectUsers()
    .then(response => response.rows)
    .then((users) => {
      res.send(users);
    });
};
