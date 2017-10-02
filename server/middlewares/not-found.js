module.exports = function(request, response, next) {
  response.status(404).render("errors/404.hbs");
};
