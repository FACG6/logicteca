const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkUser = require('../../database/queries/checkUser');

exports.post = (request, response, next) => {
  const { user_name, password } = request.body;
  let payload;
  checkUser(user_name)
    .then((res) => {
      if (res.rows[0]) {
        const { user_name, role } = res.rows[0];
        payload = {
          user_name,
          role,
        };
        return compare(password, res.rows[0].password);
      }
    })
    .then((isHashed) => {
      if (!isHashed) {
        next({ code: 401 });
      } else {
        const token = jwt.sign(payload, process.env.SECRET);
        response.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 * 7 }, { httpOnly: true });
        response.status(200).send({
          error: null,
          data: payload,
        });
      }
    })
    .catch(() => {
      next({ code: 401 });
    });
};
