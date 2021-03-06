const { Pool } = require('pg');
const url = require('url');
require('dotenv').config();

let { DB_URL } = process.env;
if (process.env.NODE_ENV === 'test') {
  DB_URL = process.env.DB_TRAVIS;
} else if (process.env.NODE_ENV === 'dev') {
  DB_URL = process.env.DATABASE_LOCAL;
}
const info = url.parse(DB_URL);
const [user, password] = info.auth.split(':');
const options = {
  host: info.hostname,
  port: info.port,
  database: info.pathname.split('/')[1],
  max: process.env.MAX_DB_CONNECTION || 2,
  user,
  password,
  ssl: {
    rejectUnauthorized: false,
  },
  idleTimeoutMillis: 1000,
};

module.exports = new Pool(options);
