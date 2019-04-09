module.exports.index = function(request, response) {
  response.render("index.html");
};

module.exports.csp = function(request, response) {
  console.log(request.body);
  response.setHeader("Content-Type", "application/json");
  response.send(request.body);
};
