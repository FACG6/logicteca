const { verifykCookie } = require('./helpers');

exports.auth = (request, response, next) => {
  const { jwt } = request.cookies;

  if (jwt) {
    verifykCookie(request.cookies.jwt, process.env.SECRET)
      .then((decoded) => {
        if (decoded) {
          request.token = decoded;
          next();
        }
      })
      .catch(() => {
        response.clearCookie('jwt');
        response.status(401).send({ msg: ' you are not authenticated' });
      });
  } else {
    response.status(401).send({ msg: ' you are not authenticated' });
  }
};
