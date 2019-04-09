module.exports = function(error, request, response, next) {
  console.error(error.stack);
  response.status(500).render("error.html", { error: error });
};