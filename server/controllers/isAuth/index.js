exports.isAuthenticated = (req, res) => {
  const { user_name, role } = req.token;
  res.status(200).send({ user_name, role });
};
