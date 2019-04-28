const path = require('path');
const { readFileSync } = require('fs');
const connect = require('./connection');

const fakeSql = readFileSync(path.join(__dirname, 'dbBuildFakeData.sql')).toString();

const selectAllUser = connect.query('select * from users');
const selectAllProject = connect.query('select * from projects');
const selectAllScrum = connect.query('select * from scrums');

module.exports = () => new Promise((resolve) => {
  const queries = [];
  connect.query(fakeSql)
    .then(() => Promise.all([selectAllUser, selectAllProject]))
    .then((res) => {
      const users = res[0].rows;
      const projects = res[1].rows;
      users.forEach((user) => {
        projects.forEach((project) => {
          queries.push(connect.query('insert into users_projects (project_id,user_id) values ($1,$2)', [
            project.id,
            user.id,
          ]));
        });
      });
      let count = 0;
      projects.forEach((project) => {
        count += 1;
        queries.push(connect.query('insert into scrums (name,project_id) values ($1,$2)', [
          `Scrum${count}`,
          project.id,
        ]));
      });
      selectAllScrum
        .then(resScrum => resScrum.rows)
        .then((resScrum) => {
          resScrum.forEach((scrum) => {
            queries.push(connect.query('insert into tasks (description,scrum_id,assigned_to) values ($1,$2,$3)', [
              'Task1',
              scrum.id,
              users[0].user_name,
            ]));
          });
        }).catch(error => console.log(error));
    })
    .then(() => Promise.all(queries))
    .then(() => resolve())
    .catch(error => console.log(error));
});
