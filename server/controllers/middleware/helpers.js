const { verify } = require('jsonwebtoken');

exports.verifykCookie = (cookie, secret) => new Promise((resolve, reject) => {
  verify(cookie, secret, (err, decoded) => {
    if (err) reject(err);
    resolve(decoded);
  });
});
