const controllers = require("./controllers");

module.exports = function(app) {
  app.get("/", controllers.index);
  app.post("/csp", controllers.csp);
};
