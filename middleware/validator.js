const validateRole = function(req, res, next) {
  const role = req.headers.authorization
    ? req.headers.authorization.toLowerCase()
    : null;

  if (role !== "admin") {
    return res
      .status(403)
      .send("Invalid credentials to create a document on db");
  }
  next();
};

module.exports = {
  validateRole
};
