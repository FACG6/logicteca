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
      .catch((error) => {
        response.clearCookie('jwt');
        error.code = 401;
        next(error);
      });
  } else {
    next({ code: 401, msg: 'No jwt' });
  }
};
