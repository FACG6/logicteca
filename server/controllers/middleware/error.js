const createError = require('http-errors');

exports.server = (error, req, res, next) => {
  switch (error.code) {
    case 401:
      res.status(401).send(createError(401, 'Unauthorized'));
      break;
    case 403:
      res.status(403).send(createError(403, 'forbidden'));
      break;
    case 422:
      res.status(422).send(createError(422, 'Validation Error'));
      break;
    default:
      res.status(500).send(createError(500, 'Internal Server Error'));
      break;
  }
};
