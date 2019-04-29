const { compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkUser = require('../../database/queries/checkUser');

exports.post = (request, response) => {
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
        response.status(401).send({
          error: {
            code: 401,
            msg: 'Invalid username or password',
          },
          data: [],
        });
      } else {
        const token = jwt.sign(payload, process.env.SECRET);
        response.cookie('jwt', token, { maxAge: 60 * 60 * 24 }, { httpOnly: true });
        response.status(201).send({
          error: null,
          data: {
            code: 201,
            msg: 'Success Login',
          },
        });
      }
    })
    .catch(() => response.status(401).send({
      error: {
        code: 401,
        msg: 'Invalid username or password',
      },
      data: [],
    }));
};
