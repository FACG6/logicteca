const express = require('express');
const Cookie = require('cookie-parser');

const { router } = require('./controllers/index');

const app = express();

app.use(Cookie());

app.set('port', process.env.PORT || 5000);

app.use('/api/v1', router);

module.exports = app;
