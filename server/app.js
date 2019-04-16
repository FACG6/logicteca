const express = require('express');
const Cookie = require('cookie-parser');
const { join } = require('path');

const { router } = require('./Router/index');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(Cookie());

app.set('port', process.env.PORT || 5000);

app.use('/api/v1', router);

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (_req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;
