const logout = (request, response) => {
  response.clearCookie('jwt');
  response.status(200).send({ error: null, data: { code: 200, msg: 'logout successful' } });
};

module.exports = logout;
