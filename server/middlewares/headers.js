module.exports = function(req, res, next) {
  res.setHeader("Server", "mickael-vieira.com");
  next();
};
