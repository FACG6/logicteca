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
        .expect(201)
        .end((err, res) => {
          if (err) t.error(err);
          t.equal(typeof res.body, 'object', ' Return typeof object ');
          t.end();
        });
    }).catch(err => t.error(err));
});

test('Testing /api/v1/login login route for in-valid user ', (t) => {
  const errMsg = { msg: 'Invalid username or password' };
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
          t.deepEqual(res.body, errMsg, ' should return errMsg: check your username ');
          t.end();
        });
    }).catch(err => t.error(err));
});

test('Testing /api/v1/login login route for in-valid password ', (t) => {
  const errMsg = { msg: 'Invalid username or password' };
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
          t.deepEqual(res.body, errMsg, ' should return errMsg: check your password ');
          t.end();
        });
    }).catch(err => t.error(err));
});
