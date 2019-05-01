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
        next({ code: 401 });
      });
  } else {
    next({ code: 401 });
  }
};
