const test = require('tape');
const supertest = require('supertest');
const route = require('../../server/app');
const buildDB = require('../../server/database/config/dbBuild');
const connect = require('../../server/database/config/connection');

buildDB();

const selectScrum = () => {
  const getScrums = {
    text: 'SELECT * from scrums',
  };
  return connect.query(getScrums);
};

// // selectScrum()
// //   .then(result => console.log(result.rows));

test('Testing for api/v1/scrums/:scrumId route', (t) => {
  selectScrum()
    .then((result) => {
      console.log(9999999, result);
      supertest(route)
        .get(`api/v1/scrums/${result.rows[0].id}`)
        .expect(200)
        .expect('content-type', /html/)
        .end((err, res) => {
          if (err) {
            console.log(8888, err);
            t.error(err);
            t.end();
          } else {
            console.log(9999999, typeof res.body);
            t.equal(typeof res.body, 'Object', 'Shoud return type of the body is object');
            t.end();
          }
        });
    })
    .catch(err => console.log(555, err));
});
