module.exports = function(request, response, next) {
  console.log(`Serving: ${request.url}`);
  next();
};
