const test = require('tape');
const supertest = require('supertest');
const connect = require('../../../server/database/config/connection');
const router = require('../../../server/app');

const checkUser =  username => connect.query('select * from users where user_name = $1', [username]);

test('Testing /api/v1/login login route for valid user ', (t) => {
  const user = {
    user_name: 'Angham116',
    password: 'Angh12345678',
  };
  checkUser(user.username)
    .then(() => {
      supertest(router)
        .post('/api/v1/login')
        .send(user)
        .expect(200)
        .end((err, res) => {
          if (err) t.error(err);
          t.equal(res.header['set-cookie'][0].includes('jwt'), true, ' Should return true');
          t.end();
        });
    }).catch(err => t.error(err));
});

test('Testing /api/v1/login login route for in-valid user ', (t) => {
  const user = {
    user_name: 'Angham1166',
    password: 'Angh12345678',
  };
  checkUser(user.username)
    .then(() => {
      supertest(router)
        .post('/api/v1/login')
        .send(user)
        .expect(401)
        .end((err, res) => {
          if (err) t.error(err);
          t.equal(res.res.statusMessage, 'Unauthorized', 'Should return Unauthorized');
          t.end();
        });
    }).catch(err => t.error(err));
});

test('Testing /api/v1/login login route for in-valid password ', (t) => {
  const user = {
    user_name: 'Angham116',
    password: 'Angh123456789',
  };
  checkUser(user.username)
    .then(() => {
      supertest(router)
        .post('/api/v1/login')
        .send(user)
        .expect(401)
        .end((err, res) => {
          if (err) t.error(err);
          t.equal(res.res.statusMessage, 'Unauthorized', 'Should return Unauthorized');
          t.end();
        });
    }).catch(err => t.error(err));
});
