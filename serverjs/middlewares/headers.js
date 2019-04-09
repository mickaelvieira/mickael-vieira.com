module.exports = function(req, res, next) {
  res.setHeader("Server", "Mick");
  next();
};
